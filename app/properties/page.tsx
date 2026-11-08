import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PropertyGrid } from "@/components/property-grid";
import { listProperties } from "@/lib/db";
import { demoProperties } from "@/lib/demo-properties";
import { categoryType } from "@/lib/property-utils";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Properties in Greece", description: "Explore a considered collection of homes in Greece." };
type SearchParams = Promise<{ type?: string; location?: string; category?: string; minPrice?: string; maxPrice?: string; sort?: string }>;
export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }){const query=await searchParams;const data=await listProperties().catch(()=>null);const properties=data?.length?data:demoProperties;const category=categoryType(query.category)?query.category||"":"";const initialFilters={type:["all","sale","rent"].includes(query.type||"")?query.type||"all":"all",location:query.location||"",category,minPrice:query.minPrice||"",maxPrice:query.maxPrice||"",sort:["recommended","newest","price-asc","price-desc"].includes(query.sort||"")?query.sort||"recommended":"recommended"};return <><SiteHeader/><main className="listings-page"><div className="page-kicker"><span>THE COLLECTION</span><span>GREECE</span></div><p className="eyebrow">FIND YOUR PLACE</p><h1>Considered homes,<br/><em>chosen for living.</em></h1><p className="listings-intro">Explore the collection by location and let us help you find the right fit.</p>{properties.some(p=>p.demo)&&<p className="preview-notice">Sample listings shown for preview. Replace with verified property details before launch.</p>}<PropertyGrid properties={properties} initialFilters={initialFilters}/></main><SiteFooter/></>;}
