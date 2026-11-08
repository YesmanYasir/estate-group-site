import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyCarousel } from "@/components/property-carousel";
import { HomeHero } from "@/components/home-hero";
import { listProperties } from "@/lib/db";
import { demoProperties } from "@/lib/demo-properties";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";

export const dynamic = "force-dynamic";

const propertyTypes = ["Apartments", "Houses", "Villas", "Penthouses", "Land", "Developments"];
const typeLabels = {
  en: ["Apartments", "City living", "Houses", "Room to settle", "Villas", "A life outdoors", "Penthouses", "Above it all", "Land", "Start with a view", "Developments", "A new perspective"],
  tr: ["Daireler", "Şehir yaşamı", "Evler", "Yeni bir yuva", "Villalar", "Açık havada yaşam", "Penthouse daireler", "Manzaraya yakın", "Arsalar", "Manzarayla başlayın", "Projeler", "Yeni bir bakış"],
  el: ["Διαμερίσματα", "Ζωή στην πόλη", "Κατοικίες", "Χώρος για να μείνετε", "Βίλες", "Ζωή έξω", "Ρετιρέ", "Πάνω από όλα", "Οικόπεδα", "Ξεκινήστε με θέα", "Αναπτύξεις", "Μια νέα οπτική"],
} as const;

export default async function HomePage() {
  const [stored, locale] = await Promise.all([listProperties().catch(() => null), getSiteLocale()]);
  const properties = (stored?.length ? stored : demoProperties).slice(0, 8);
  const featured = properties.slice(0, 5);
  return <>
    <SiteHeader overlay locale={locale} />
    <main>
      <HomeHero properties={properties} locale={locale} />
      <section className="collection-section" id="selected-homes" aria-labelledby="collection-title">
        <div className="section-heading collection-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> SPITOGO · GREECE</p><h2 id="collection-title">{t(locale, "homeTitle")} <em>{t(locale, "homeEm")}</em></h2></div></div>
        {featured.some((property) => property.demo) && <p className="preview-notice">{locale === "tr" ? "Örnek ilanlar önizleme içindir; gerçek ilanlar doğrulandıkça eklenecektir." : locale === "el" ? "Οι ενδεικτικές αγγελίες είναι μόνο για προεπισκόπηση." : "Sample listings are shown for preview; verified homes will replace them."}</p>}
        <PropertyCarousel properties={featured} locale={locale} />
      </section>
      <section className="types-section" aria-labelledby="types-title">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-rule" /> {t(locale, "find")}</p><h2 id="types-title">{t(locale, "typesTitle")} <em>{t(locale, "typesEm")}</em></h2></div><Link href="/properties" className="section-link">{t(locale, "browse")} <span aria-hidden="true">↗</span></Link></div>
        <div className="type-grid">{propertyTypes.map((name,index) => <Link className="type-card" key={name} href={`/properties?category=${encodeURIComponent(name)}`}><span className="type-icon" aria-hidden="true">{["▦","⌂","⌂","▤","◇","▥"][index]}</span><span className="type-name">{typeLabels[locale][index*2]}</span><span className="type-detail">{typeLabels[locale][index*2+1]}</span><span className="type-arrow" aria-hidden="true">↗</span></Link>)}</div>
      </section>
      <section className="seller-banner" id="sell-with-us"><div><p className="eyebrow">SPITOGO · {t(locale, "submit")}</p><h2>{locale==="tr"?"Evinizi Spitogo’da paylaşın.":locale==="el"?"Παρουσιάστε το ακίνητό σας στο Spitogo.":"Bring your home to Spitogo."}</h2></div><p>{t(locale, "introSubmit")}</p><Link className="seller-link" href="/submit-property">{t(locale, "submit")} <span aria-hidden="true">↗</span></Link></section>
    </main>
    <SiteFooter locale={locale} />
  </>;
}
