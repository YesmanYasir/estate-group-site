import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyGallery } from "@/components/property-gallery";
import { demoProperties } from "@/lib/demo-properties";
import { formatPrice } from "@/lib/format";
import { listProperties } from "@/lib/db";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";
export const dynamic = "force-dynamic";
async function find(slug:string){const list=await listProperties().catch(()=>null);return [...(list||[]),...demoProperties].find(p=>p.slug===slug);}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=await find(slug);return {title:p?.title||"Property",description:p?.description};}
export default async function PropertyPage({params}:{params:Promise<{slug:string}>}){
  const [{slug},locale]=await Promise.all([params,getSiteLocale()]);const p=await find(slug);if(!p)notFound();
  const offerLabel=p.listingType==="rent"?t(locale,"rent"):p.listingType==="golden_visa"?t(locale,"golden"):t(locale,"sale");
  return <><SiteHeader locale={locale}/><main className="detail-page"><Link className="text-link dark" href="/properties">← {t(locale,"find")}</Link><div className="detail-heading"><div><p className="eyebrow">{p.city} · GREECE</p><h1>{p.title}</h1></div><p className="detail-price">{formatPrice(p.price,p.currency,p.listingType)}</p></div>{p.demo&&<p className="preview-notice">{locale==="tr"?"Örnek ilan. Yayından önce tüm bilgiler doğrulanmalıdır.":locale==="el"?"Ενδεικτική αγγελία. Επιβεβαιώστε τα στοιχεία πριν από τη δημοσίευση.":"Preview listing. Verify all details before publication."}</p>}<PropertyGallery images={p.images?.length?p.images:[p.coverUrl]} alt={p.alt} title={p.title} locale={locale}/><div className="detail-columns"><section className="detail-overview"><p className="eyebrow">{t(locale,"property")}</p><p className="detail-description">{p.description}</p>{p.features.length>0&&<div className="feature-list">{p.features.map(f=><span key={f}>{f}</span>)}</div>}</section><aside className="detail-facts" aria-label={t(locale,"details")}><header className="detail-facts-header"><div><p className="eyebrow">{p.city}</p><h2>{t(locale,"details")}</h2></div><span className="detail-offer-pill">{offerLabel}</span></header><div className="detail-stat-grid"><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 20V5m0 10h18v5M3 12h18a2 2 0 0 1 2 2v1H3zm4-1V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3"/></svg></span><small>{t(locale,"beds")}</small><strong>{p.bedrooms}</strong></div><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4Zm2 0V7a3 3 0 0 1 6 0v1m-7 12v2m14-2v2"/></svg></span><small>{t(locale,"baths")}</small><strong>{p.bathrooms}</strong></div><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20V4m0 0h16M4 4l16 16M8 4v4m4-4v2m4-2v4M8 20v-4m4 4v-2m4 2v-4"/></svg></span><small>{t(locale,"area")}</small><strong>{p.area} m²</strong></div></div><dl className="detail-meta-list"><div><dt>{t(locale,"propertyType")}</dt><dd>{p.propertyType}</dd></div><div><dt>{t(locale,"offer")}</dt><dd>{offerLabel}</dd></div><div><dt>{t(locale,"location")}</dt><dd>{p.city}</dd></div></dl><a className="button button-dark" href={`mailto:bluegreentouring@gmail.com?subject=${encodeURIComponent(p.title)}`}>{t(locale,"contactFor")} <span aria-hidden="true">↗</span></a></aside></div></main><SiteFooter locale={locale}/></>;
}
