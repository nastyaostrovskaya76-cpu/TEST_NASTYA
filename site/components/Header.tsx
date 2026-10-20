"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#program", label: "Программа" },
  { href: "/#process", label: "Как проходит" },
  { href: "/#price", label: "Стоимость" },
  { href: "/#about", label: "Обо мне" },
  { href: "/#faq", label: "Вопросы" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header${open ? " header--open" : ""}`}>
      <div className="wrap header__in">
        <Link className="brand" href="/#top" onClick={close} aria-label="Анастасия Островская — на главную">
          <span className="brand__mark" aria-hidden="true">АО</span>
          <span className="brand__name">Анастасия<br />Островская</span>
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
        <nav id="site-nav" className="nav" aria-label="Основное меню">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
          ))}
          <Link className="btn" href="/#zayavka" onClick={close}>Обсудить обучение</Link>
        </nav>
      </div>
    </header>
  );
}
