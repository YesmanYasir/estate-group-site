import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyGrid } from "@/components/property-grid";
import { listProperties } from "@/lib/db";
import { demoProperties } from "@/lib/demo-properties";
import { categoryType } from "@/lib/property-utils";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Properties in Greece", description: "Explore homes in Greece with Spitogo." };
type SearchParams = Promise<{ type?: string; location?: string; category?: string; minPrice?: string; maxPrice?: string; sort?: string }>;
export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const [query,data,locale]=await Promise.all([searchParams,listProperties().catch(()=>null),getSiteLocale()]);
  const properties=data?.length?data:demoProperties;
  const category=categoryType(query.category)?query.category||"":"";
  const initialFilters={type:["all","sale","rent","golden_visa"].includes(query.type||"")?query.type||"all":"all",location:query.location||"",category,minPrice:query.minPrice||"",maxPrice:query.maxPrice||"",sort:["recommended","newest","price-asc","price-desc"].includes(query.sort||"")?query.sort||"recommended":"recommended"};
  return <><SiteHeader locale={locale}/><main className="listings-page"><div className="page-kicker"><span>SPITOGO</span><span>GREECE</span></div><p className="eyebrow">{t(locale,"find")}</p><h1>{t(locale,"findPlace")}<br/><em>{t(locale,"findPlaceEm")}</em></h1><p className="listings-intro">{t(locale,"findIntro")}</p>{properties.some(p=>p.demo)&&<p className="preview-notice">{locale==="tr"?"Örnek ilanlar önizleme içindir; gerçek ilanlar doğrulandıkça eklenecektir.":locale==="el"?"Οι ενδεικτικές αγγελίες είναι μόνο για προεπισκόπηση.":"Sample listings are shown for preview; verified homes will replace them."}</p>}<PropertyGrid properties={properties} initialFilters={initialFilters} locale={locale}/></main><SiteFooter locale={locale}/></>;
}
