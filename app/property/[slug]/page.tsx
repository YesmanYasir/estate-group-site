import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { demoProperties } from "@/lib/demo-properties";
import { formatPrice } from "@/lib/format";
import { listProperties } from "@/lib/db";
export const dynamic = "force-dynamic";
async function find(slug:string){const list=await listProperties().catch(()=>null);return [...(list||[]),...demoProperties].find(p=>p.slug===slug);}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=await find(slug);return {title:p?.title||"Property",description:p?.description};}
export default async function PropertyPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=await find(slug);if(!p)notFound();return <><SiteHeader/><main className="detail-page"><Link className="text-link dark" href="/properties">← All properties</Link><div className="detail-heading"><div><p className="eyebrow">{p.city} · GREECE</p><h1>{p.title}</h1></div><p className="detail-price">{formatPrice(p.price,p.currency,p.listingType)}</p></div>{p.demo&&<p className="preview-notice">Preview listing — replace all details with verified information before launch.</p>}<div className="detail-image"><Image src={p.coverUrl} alt={p.alt} fill priority sizes="100vw"/></div><div className="detail-columns"><section><p className="eyebrow">THE PROPERTY</p><p className="detail-description">{p.description}</p><div className="feature-list">{p.features.map(f=><span key={f}>{f}</span>)}</div></section><aside className="detail-facts"><div><small>BEDROOMS</small><strong>{p.bedrooms}</strong></div><div><small>BATHROOMS</small><strong>{p.bathrooms}</strong></div><div><small>AREA</small><strong>{p.area} m²</strong></div><a className="button button-dark" href="mailto:hello@aim-estategroup.com?subject=Property%20enquiry">Ask about this property ↗</a></aside></div></main><SiteFooter/></>;}
