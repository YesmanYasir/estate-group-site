"use client";
import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function SiteHeader({ overlay = false, locale = "en" }: { overlay?: boolean; locale?: Locale }) {
  const [open, setOpen] = useState(false);
  function setLocale(value: string) {
    if (value !== "en" && value !== "tr" && value !== "el") return;
    document.cookie = "spitogo-locale=" + value + ";path=/;max-age=31536000;SameSite=Lax" + (location.protocol === "https:" ? ";Secure" : "");
    location.reload();
  }
  return <header className={"site-header" + (overlay ? " is-overlay" : "")}>
    <Link className="wordmark" href="/" aria-label="Spitogo home">
      <svg className="spitogo-symbol" aria-hidden="true" viewBox="0 0 40 40" fill="none"><path d="M5 19 20 6l15 13v15H5V19Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M14 25h8v9h-8zM25 14l7 7m-6-5 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="29" cy="12" r="3" fill="currentColor"/></svg>
      <span className="wordmark-name">spitogo</span>
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="/properties">{t(locale,"find")}</Link><Link href="/golden-visa">{t(locale,"golden")}</Link>
      <Link href="/submit-property">{t(locale,"submit")}</Link>
      <label className="language-select"><span className="sr-only">Language</span><select aria-label="Language" value={locale} onChange={(event) => setLocale(event.target.value)}><option value="en">EN</option><option value="tr">TR</option><option value="el">EL</option></select></label>
    </nav>
    <button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>{open ? "×" : "☰"}</button>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/properties" onClick={() => setOpen(false)}>{t(locale,"find")}</Link><Link href="/golden-visa" onClick={() => setOpen(false)}>{t(locale,"golden")}</Link>
      <Link href="/submit-property" onClick={() => setOpen(false)}>{t(locale,"submit")}</Link>
      <label className="language-select"><span>Language</span><select aria-label="Language" value={locale} onChange={(event) => setLocale(event.target.value)}><option value="en">English</option><option value="tr">Türkçe</option><option value="el">Ελληνικά</option></select></label>
    </nav>}
  </header>;
}
