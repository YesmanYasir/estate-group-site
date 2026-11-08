import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";
export function PropertyCard({ property, index = 0, compact = false }: { property: Property; index?: number; compact?: boolean }) {
  return <article className={`property-card${compact ? " property-card-compact" : ""}`} style={{ "--card-index": index } as React.CSSProperties}>
    <Link className="property-image" href={`/property/${property.slug}`} aria-label={`View ${property.title}`}>
      <Image src={property.coverUrl} alt={property.alt} fill sizes={compact ? "(max-width: 600px) 82vw, (max-width: 1100px) 38vw, 24vw" : "(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"} />
      <span className="image-index">0{index + 1} <i>—</i> {property.listingType === "rent" ? "For rent" : "For sale"}</span>
      {property.demo && <span className="demo-tag">Preview listing</span>}
    </Link>
    <div className="property-meta"><div><p className="eyebrow">{property.city}</p><h3><Link href={`/property/${property.slug}`}>{property.title}</Link></h3></div><p className="price">{formatPrice(property.price, property.currency, property.listingType)}</p></div>
    <ul className="property-specs" aria-label="Property details">
      <li><SpecIcon type="bed"/><span className="spec-value">{property.bedrooms}</span><span className="spec-label">Beds</span></li>
      <li><SpecIcon type="bath"/><span className="spec-value">{property.bathrooms}</span><span className="spec-label">Baths</span></li>
      <li><SpecIcon type="area"/><span className="spec-value">{property.area.toLocaleString("en-IE")}</span><span className="spec-label">m²</span></li>
      <li className="spec-detail-link"><Link href={`/property/${property.slug}`} aria-label={`View details for ${property.title}`} className="arrow-link"><ArrowIcon/></Link></li>
    </ul>
  </article>;
}

function SpecIcon({ type }: { type: "bed" | "bath" | "area" }) {
  const paths = {
    bed: <><path d="M3 20V5m0 10h18v5M3 12h18a2 2 0 0 1 2 2v1H3zm4-1V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3"/><path d="M5 11h2"/></>,
    bath: <><path d="M4 12V7a3 3 0 0 1 6 0v2m0 0h9a2 2 0 0 1 2 2v5H3v-4a3 3 0 0 1 3-3h4Zm-1 5v3m12-3v3"/><path d="M7 7h.01"/></>,
    area: <><rect x="4" y="4" width="16" height="16" rx="1"/><path d="M9 4v4m4-4v2m4-2v4M4 9h4M4 13h2m-2 4h4"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="spec-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="detail-arrow" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11"/></svg>;
}
