import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubmitPropertyForm,SubmitPropertyGoogleSignIn } from "@/components/submit-property-form";
import { t } from "@/lib/i18n";
import { getSiteLocale } from "@/lib/locale";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"List your property with Spitogo",robots:{index:false,follow:false}};
export default async function SubmitPropertyPage(){
 const [locale,session]=await Promise.all([getSiteLocale(),auth()]);
 return <><SiteHeader locale={locale}/><main className="submit-page"><Link className="text-link dark" href="/properties">← {t(locale,"find")}</Link><div className="submit-page-heading"><p className="eyebrow">SPITOGO · GREECE</p><h1>{t(locale,"submitPage")}</h1><p>{t(locale,"introSubmit")}</p></div><section className="submit-card">{session?.user?.email?<SubmitPropertyForm locale={locale} email={session.user.email}/>:<SubmitPropertyGoogleSignIn locale={locale}/>}</section></main><SiteFooter locale={locale}/></>;
}
