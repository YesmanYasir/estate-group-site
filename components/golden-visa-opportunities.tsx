import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
const opportunities = [
  { price: "€250,000", area: "50 m²", href: "https://www.spitogatos.gr/en/listing/details/20793353?ref=mobileApp" },
  { price: "€250,000", area: "55 m²", href: "https://www.spitogatos.gr/en/listing/details/20780115?ref=mobileApp" },
];
export function GoldenVisaOpportunities({ locale = "en" }: { locale?: Locale }) {
  return <div className="visa-opportunities">{opportunities.map((listing,index)=><article className="visa-opportunity" key={listing.href}>
    <p className="eyebrow">{locale==="tr"?"MAL SAHİBİNİN PAYLAŞTIĞI İLAN":locale==="el"?"ΑΓΓΕΛΙΑ ΠΟΥ ΜΟΙΡΑΣΤΗΚΕ Ο ΙΔΙΟΚΤΗΤΗΣ":"OWNER-SHARED LISTING"} · {String(index+1).padStart(2,"0")}</p><h3>{listing.area} · {t(locale,"source")}</h3>
    <div className="visa-opportunity-meta"><strong>{listing.price}</strong><span>{listing.area}</span></div>
    <p>{locale==="tr"?"Konum, özellikler ve uygunluk, orijinal ilanda ve danışmanla doğrulanmalıdır.":locale==="el"?"Επιβεβαιώστε τοποθεσία και στοιχεία στην αρχική αγγελία με τον μεσίτη.":"Verify location and property details on the source listing with the agent."}</p><Link href={listing.href} target="_blank" rel="noreferrer">{t(locale,"original")} ↗</Link>
  </article>)}</div>;
}
