import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoldenVisaEnquiry } from "@/components/golden-visa-enquiry";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Golden Visa Greece",description:"A 2026 overview of Greece's investor residence permit and qualifying property investment routes."};
export default async function GoldenVisaPage(){
  const locale=await getSiteLocale();
  return <><SiteHeader locale={locale}/><main className="visa-page">
    <section className="visa-hero"><p className="eyebrow">SPITOGO · GREECE</p><h1>{t(locale,"goldenHero")}<br/><em>{t(locale,"goldenHeroEm")}</em></h1><p>{t(locale,"goldenIntro")}</p><a className="button button-light" href="#visa-enquiry">{t(locale,"start")} <span>↘</span></a></section>
    <section className="visa-benefits"><div className="visa-section-heading"><p className="eyebrow">{t(locale,"golden")}</p><h2>{t(locale,"goldenBenefits")}</h2></div>
      <div className="visa-benefit-grid"><article><span>01</span><h3>{t(locale,"family")}</h3><p>{t(locale,"familyCopy")}</p></article><article><span>02</span><h3>{t(locale,"travel")}</h3><p>{t(locale,"travelCopy")}</p></article><article><span>03</span><h3>{t(locale,"stay")}</h3><p>{t(locale,"stayCopy")}</p></article></div>
    </section>
    <section className="visa-rules"><div className="visa-section-heading"><p className="eyebrow">{t(locale,"investment")}</p><h2>{t(locale,"thresholds")}</h2><p>{t(locale,"investmentCopy")}</p></div>
      <div className="visa-rule-grid"><article className="visa-rule visa-rule-featured"><p className="eyebrow">€800,000</p><h3>{t(locale,"high")}</h3><p>{t(locale,"highCopy")}</p></article><article className="visa-rule"><p className="eyebrow">€400,000</p><h3>{t(locale,"rest")}</h3><p>{t(locale,"restCopy")}</p></article><article className="visa-rule"><p className="eyebrow">€250,000</p><h3>{t(locale,"conversion")}</h3><p>{t(locale,"conversionCopy")}</p></article></div>
      <p className="visa-legal-note">{t(locale,"noGuarantee")} <a href="https://diavgeia.gov.gr/doc/%CE%A8%CE%A3%99746%CE%9C%CE%94%CE%A8%CE%9F-%CE%94%CE%A7%CE%9C" target="_blank" rel="noreferrer">{t(locale,"legalSource")} ↗</a></p>
    </section>
    <section className="visa-listings"><div className="visa-section-heading"><p className="eyebrow">{t(locale,"golden")}</p><h2>{t(locale,"opportunities")}</h2><p>{t(locale,"opportunitiesCopy")}</p></div><Link className="button button-dark" href="/properties?type=sale">{t(locale,"exploreHomes")} ↗</Link></section>
    <section className="visa-enquiry" id="visa-enquiry"><div><p className="eyebrow">{t(locale,"contact")}</p><h2>{t(locale,"start")}</h2><p>{t(locale,"noGuarantee")}</p><p><a href="tel:+306975672933">{t(locale,"phone")}</a><br/><a href="mailto:bluegreentouring@gmail.com">{t(locale,"email")}</a></p></div><GoldenVisaEnquiry locale={locale}/></section>
  </main><SiteFooter locale={locale}/></>;
}
