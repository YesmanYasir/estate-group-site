import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  return <footer className="site-footer" id="contact">
    <div className="footer-brand"><Image src="/brand/bluegreen-spitogo.png" alt="BlueGreen Tourism and Spitogo logos" width={509} height={790} sizes="120px" /></div>
    <div><p className="eyebrow">{t(locale,"footerKicker")}</p><h2>{t(locale,"footerTitle")}</h2><p className="footer-parent">{t(locale,"by")}</p></div>
    <div className="footer-contact"><Link href="/properties">{t(locale,"exploreHomes")} ↗</Link><Link href="/submit-property">{t(locale,"submit")} ↗</Link>
      <a href="tel:+306975672933">{t(locale,"phone")}</a><a href="mailto:bluegreentouring@gmail.com">{t(locale,"email")}</a>
      <small>{t(locale,"preview")}</small></div>
    <div className="footer-bottom"><span>SPITOGO</span><span>© {new Date().getFullYear()} · BlueGreen Tourism</span><Link href="/admin">{t(locale,"admin")}</Link></div>
  </footer>;
}
