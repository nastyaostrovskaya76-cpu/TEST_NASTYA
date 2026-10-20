// Печатает chat_id всех, кто писал вашему боту. Запуск: npm run telegram:chat-id
import { readFileSync } from "node:fs";

let token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    token = env.match(/^TELEGRAM_BOT_TOKEN=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!token) {
  console.log("Не нашёл TELEGRAM_BOT_TOKEN в .env.local");
  process.exit(1);
}
const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const data = await res.json();
if (!data.ok) {
  console.log("Telegram ответил ошибкой — проверьте токен");
  process.exit(1);
}
const chats = new Map();
for (const u of data.result) {
  const c = (u.message || u.channel_post || u.my_chat_member)?.chat;
  if (c) chats.set(c.id, c.title || [c.first_name, c.last_name].filter(Boolean).join(" ") || c.username);
}
if (!chats.size) console.log("Пока пусто: откройте бота в Telegram, нажмите Start или напишите ему, затем запустите ещё раз");
for (const [id, name] of chats) console.log(`${name}: ${id}`);
