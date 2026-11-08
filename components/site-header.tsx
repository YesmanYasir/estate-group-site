"use client";

import Link from "next/link";
import { useState } from "react";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return <header className={`site-header${overlay ? " is-overlay" : ""}`}>
    <Link className="wordmark" href="/" aria-label="AIM Estate Group home">AIM <span>ESTATE GROUP</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link href="/properties">Find a home</Link>
      <a href="/#sell-with-us">Sell with us</a>
      <Link href="/admin">Log in</Link>
    </nav>
    <button className="menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>{open ? "×" : "☰"}</button>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/properties" onClick={() => setOpen(false)}>Find a home</Link>
      <a href="/#sell-with-us" onClick={() => setOpen(false)}>Sell with us</a>
      <Link href="/admin" onClick={() => setOpen(false)}>Admin log in</Link>
    </nav>}
  </header>;
}
