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
    <div className="property-specs"><span>{property.bedrooms} bedrooms</span><span>{property.bathrooms} baths</span><span>{property.area} m²</span><Link href={`/property/${property.slug}`} aria-label={`Details for ${property.title}`} className="arrow-link">↗</Link></div>
  </article>;
}
