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
  return <><SiteHeader locale={locale}/><main className="detail-page"><Link className="text-link dark" href="/properties">← {t(locale,"find")}</Link><div className="detail-heading"><div><p className="eyebrow">{p.city} · GREECE</p><h1>{p.title}</h1></div><p className="detail-price">{formatPrice(p.price,p.currency,p.listingType)}</p></div>{p.demo&&<p className="preview-notice">{locale==="tr"?"Örnek ilan. Yayından önce tüm bilgiler doğrulanmalıdır.":locale==="el"?"Ενδεικτική αγγελία. Επιβεβαιώστε τα στοιχεία πριν από τη δημοσίευση.":"Preview listing. Verify all details before publication."}</p>}<PropertyGallery images={p.images?.length?p.images:[p.coverUrl]} alt={p.alt} title={p.title} locale={locale}/><div className="detail-columns"><section className="detail-overview"><p className="eyebrow">{t(locale,"property")}</p><p className="detail-description">{p.description}</p>{p.features.length>0&&<div className="feature-list">{p.features.map(f=><span key={f}>{f}</span>)}</div>}</section><aside className="detail-facts" aria-label={t(locale,"details")}><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 20V9l9-6 9 6v11M8 20v-6h8v6M8 10h.01M16 10h.01"/></svg></span><small>{t(locale,"beds").toUpperCase()}</small><strong>{p.bedrooms}</strong></div><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4Zm2 0V7a3 3 0 0 1 6 0v1m-7 12v2m14-2v2"/></svg></span><small>{t(locale,"baths").toUpperCase()}</small><strong>{p.bathrooms}</strong></div><div><span className="fact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20V4m0 0h16M4 4l16 16M8 4v4m4-4v2m4-2v4M8 20v-4m4 4v-2m4 2v-4"/></svg></span><small>{t(locale,"area").toUpperCase()}</small><strong>{p.area} m²</strong></div><a className="button button-dark" href={`mailto:bluegreentouring@gmail.com?subject=${encodeURIComponent(p.title)}`}>{t(locale,"contactFor")} ↗</a></aside></div></main><SiteFooter locale={locale}/></>;
}
