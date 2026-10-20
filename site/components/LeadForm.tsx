"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACTS } from "@/lib/content";

type Errors = Partial<Record<"name" | "contact" | "audience" | "consent", string>>;
type Status = "idle" | "sending" | "done" | "error";

const CONTACT_RE = /^(@[A-Za-z0-9_]{4,32}|\+?[\d\s()-]{7,20})$/;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [audience, setAudience] = useState<"" | "team" | "self">("");
  const formRef = useRef<HTMLFormElement>(null);

  // Кнопки «для команды» / «для себя» в других блоках выбирают вариант заранее
  useEffect(() => {
    const pick = () => {
      const h = window.location.hash;
      if (h === "#zayavka-team") setAudience("team");
      if (h === "#zayavka-self") setAudience("self");
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const contact = String(fd.get("contact") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const consent = fd.get("consent") === "on";

    const next: Errors = {};
    if (!name) next.name = "Напишите, как к вам обращаться";
    if (!CONTACT_RE.test(contact)) next.contact = "Укажите телефон или ник в Telegram — например, +375 29 000-00-00 или @username";
    if (!audience) next.audience = "Выберите, для кого обучение — для себя или для команды";
    if (!consent) next.consent = "Отметьте согласие на обработку данных, чтобы отправить заявку";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    params.forEach((v, k) => { if (k.startsWith("utm_")) utm[k] = v.slice(0, 200); });

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, contact, audience, message, consent,
          website: String(fd.get("website") || ""),
          page: window.location.pathname,
          utm,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form form__done" role="status" id="zayavka-form">
        <h3>Заявка отправлена</h3>
        <p className="form__sub">Спасибо! Анастасия свяжется с вами, чтобы обсудить задачу, формат и стоимость</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" id="zayavka-form" onSubmit={onSubmit} noValidate>
      <h3>Заявка на обучение</h3>
      <p className="form__sub">Ответ придёт на телефон или в Telegram, который вы укажете</p>

      <div className="field">
        <label htmlFor="f-name">Имя</label>
        <input id="f-name" name="name" autoComplete="name" maxLength={120} placeholder="Как к вам обращаться"
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
        {errors.name && <span className="field__err" id="e-name">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="f-contact">Телефон или Telegram</label>
        <input id="f-contact" name="contact" type="tel" inputMode="tel" autoComplete="tel" maxLength={60}
          placeholder="+375 29 000-00-00 или @username"
          aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "e-contact" : "h-contact"} />
        {errors.contact
          ? <span className="field__err" id="e-contact">{errors.contact}</span>
          : <span className="field__hint" id="h-contact">Номер с кодом страны или ник в Telegram</span>}
      </div>

      <fieldset className="field" aria-invalid={!!errors.audience} aria-describedby={errors.audience ? "e-aud" : undefined}>
        <legend>Обучение</legend>
        <div className="choice">
          <label>
            <input type="radio" name="audience" value="team" checked={audience === "team"} onChange={() => setAudience("team")} />
            Для команды
          </label>
          <label>
            <input type="radio" name="audience" value="self" checked={audience === "self"} onChange={() => setAudience("self")} />
            Для себя
          </label>
        </div>
        {errors.audience && <span className="field__err" id="e-aud">{errors.audience}</span>}
      </fieldset>

      <div className="field">
        <label htmlFor="f-msg">Комментарий <span style={{ textTransform: "none", fontWeight: 400 }}>— по желанию</span></label>
        <textarea id="f-msg" name="message" maxLength={2000}
          placeholder="Что продаёт компания, сколько человек в команде, что хотите улучшить" />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Сайт</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "e-consent" : undefined} />
        <span>
          Согласен(на) на обработку персональных данных в соответствии с{" "}
          <a href="/privacy" target="_blank">политикой обработки данных</a>
        </span>
      </label>
      {errors.consent && <p className="field__err" id="e-consent" style={{ marginTop: 8 }}>{errors.consent}</p>}

      <button className="btn btn--em" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Отправить заявку"}
      </button>
      {status === "error" && (
        <p className="form__status form__status--err" role="alert">
          Не получилось отправить заявку. Попробуйте ещё раз или позвоните:{" "}
          <a href={CONTACTS.phoneHref}>{CONTACTS.phone}</a>
        </p>
      )}
    </form>
  );
}
