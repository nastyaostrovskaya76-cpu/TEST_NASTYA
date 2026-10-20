import { NextResponse } from "next/server";

const CONTACT_RE = /^(@[A-Za-z0-9_]{4,32}|\+?[\d\s()-]{7,20})$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function saveToSupabase(row: Record<string, unknown>) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error(`supabase not configured: ${!url ? "SUPABASE_URL " : ""}${!key ? "SUPABASE_SECRET_KEY" : ""}`);
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function sendToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error(`telegram not configured: ${!token ? "TELEGRAM_BOT_TOKEN " : ""}${!chatId ? "TELEGRAM_CHAT_ID" : ""}`);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Ловушка для ботов: человек это поле не видит
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ ok: false }, { status: 429 });

  const name = str(body.name, 120);
  const contact = str(body.contact, 60);
  const audience = body.audience === "team" || body.audience === "self" ? body.audience : "";
  const message = str(body.message, 2000);
  const page = str(body.page, 500);
  const consent = body.consent === true;
  const utmRaw = body.utm && typeof body.utm === "object" ? (body.utm as Record<string, unknown>) : {};
  const utm = Object.fromEntries(
    Object.entries(utmRaw).filter(([k]) => k.startsWith("utm_")).slice(0, 10).map(([k, v]) => [k.slice(0, 40), str(v, 200)]),
  );

  if (!name || !CONTACT_RE.test(contact) || !audience || !consent) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const when = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk", dateStyle: "short", timeStyle: "short" });
  const utmLine = Object.keys(utm).length ? `\nUTM: ${Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(", ")}` : "";
  const text =
    `Новая заявка с сайта\n\n` +
    `Имя: ${name}\n` +
    `Контакт: ${contact}\n` +
    `Обучение: ${audience === "team" ? "для команды" : "для себя"}\n` +
    (message ? `Комментарий: ${message}\n` : "") +
    `\nСтраница: ${page || "/"}${utmLine}\nВремя: ${when} (Минск)`;

  const results = await Promise.allSettled([
    saveToSupabase({ name, contact, audience, message: message || null, page: page || null, utm: Object.keys(utm).length ? utm : null, consent }),
    sendToTelegram(text),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`lead: ${i === 0 ? "supabase" : "telegram"} failed:`, (r.reason as Error).message);
  });

  if (results.every((r) => r.status === "rejected")) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
