import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCard } from "@/components/property-card";
import { PropertyCarousel } from "@/components/property-carousel";
import { HomeHero } from "@/components/home-hero";
import { listProperties } from "@/lib/db";
import { demoProperties } from "@/lib/demo-properties";

export const dynamic = "force-dynamic";

const propertyTypes = [
  { name: "Apartments", detail: "City living", icon: "▦" },
  { name: "Houses", detail: "Room to settle", icon: "⌂" },
  { name: "Villas", detail: "A life outdoors", icon: "⌂" },
  { name: "Penthouses", detail: "Above it all", icon: "▤" },
  { name: "Land", detail: "Start with a view", icon: "◇" },
  { name: "Developments", detail: "A new perspective", icon: "▥" },
];

export default async function HomePage() {
  const stored = await listProperties().catch(() => null);
  const properties = (stored?.length ? stored : demoProperties).slice(0, 8);
  const featured = properties.slice(0, 5);

  return <>
    <SiteHeader overlay />
    <main>
      <HomeHero properties={properties} />

      <section className="collection-section" id="selected-homes" aria-labelledby="collection-title">
        <div className="section-heading collection-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> A CLOSER LOOK</p>
            <h2 id="collection-title">Exceptional homes, <em>selected for you.</em></h2>
          </div>
        </div>
        {featured.some((property) => property.demo) && <p className="preview-notice">Sample listings shown for preview. Replace with verified property details before launch.</p>}
        <PropertyCarousel properties={featured} />
      </section>

      <section className="types-section" aria-labelledby="types-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" /> FIND YOUR KIND OF PLACE</p>
            <h2 id="types-title">Every way to <em>feel at home.</em></h2>
          </div>
          <Link href="/properties" className="section-link">Browse the collection <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="type-grid">
          {propertyTypes.map(({ name, detail, icon }) => (
            <Link className="type-card" key={name} href={`/properties?category=${encodeURIComponent(name)}`}>
              <span className="type-icon" aria-hidden="true">{icon}</span>
              <span className="type-name">{name}</span>
              <span className="type-detail">{detail}</span>
              <span className="type-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="seller-banner" id="sell-with-us">
        <div><p className="eyebrow">SELL WITH AIM</p><h2>Your home deserves<br />the <em>right audience.</em></h2></div>
        <p>Tell us a little about your property. Our team will help you decide what comes next.</p>
        <Link className="seller-link" href="/admin">List your property <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
    <SiteFooter />
  </>;
}
