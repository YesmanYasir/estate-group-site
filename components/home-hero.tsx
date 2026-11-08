"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Property } from "@/types/property";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { formatPrice } from "@/lib/format";

export function HomeHero({ properties, locale = "en" }: { properties: Property[]; locale?: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [listingType, setListingType] = useState("sale");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const slides = properties.length ? properties : [];
  const active = slides[activeIndex % Math.max(slides.length, 1)];
  function move(step: number) { if (slides.length < 2) return; setActiveIndex((current) => (current + step + slides.length) % slides.length); }
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ type: listingType });
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (location.trim()) params.set("location", location.trim());
    router.push("/properties?" + params.toString());
  }
  return <section className="home-hero" aria-label={t(locale,"heroCopy")}>
    {active && <Image key={active.id} className="hero-photo" src={active.coverUrl} alt={active.alt} fill priority sizes="100vw" unoptimized />}
    <div className="hero-shade" />
    <div className="hero-center">
      <p className="hero-kicker">SPITOGO <span>·</span> GREECE</p>
      <h1>{t(locale,"heroTitle")} <em>{t(locale,"heroEm")}</em></h1>
      <p className="hero-subtitle">{t(locale,"heroCopy")}</p>
      <form className="hero-search" onSubmit={search} aria-label={t(locale,"search")}>
        <label><span className="sr-only">{t(locale,"offer")}</span><select value={listingType} onChange={(event) => setListingType(event.target.value)}><option value="sale">{t(locale,"sale")}</option><option value="rent">{t(locale,"rent")}</option><option value="golden_visa">{t(locale,"golden")}</option></select></label>
        <label><span className="sr-only">{t(locale,"maxPrice")}</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">{locale==="tr"?"Her fiyat":locale==="el"?"Κάθε τιμή":"Any price"}</option><option value="500000">{locale==="tr"?"En fazla":"Up to"} €500,000</option><option value="1000000">{locale==="tr"?"En fazla":"Up to"} €1,000,000</option><option value="2000000">{locale==="tr"?"En fazla":"Up to"} €2,000,000</option><option value="5000000">{locale==="tr"?"En fazla":"Up to"} €5,000,000</option></select></label>
        <label className="location-field"><span className="sr-only">{t(locale,"location")}</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder={t(locale,"location")} autoComplete="address-level2" /></label>
        <button type="submit">{t(locale,"search")} <span aria-hidden="true">⌕</span></button>
      </form>
    </div>
    {active && <div className="hero-feature"><div><p>{active.listingType === "rent" ? t(locale,"rent") : active.listingType === "golden_visa" ? t(locale,"golden") : t(locale,"sale")} <span>·</span> {active.city}</p><h2>{active.title}</h2><span className="hero-price">{formatPrice(active.price, active.currency, active.listingType)}</span></div><Link href={"/property/" + active.slug}>{t(locale,"find")} <span aria-hidden="true">↗</span></Link></div>}
    {slides.length > 1 && <div className="hero-controls" aria-label="Featured homes"><button type="button" aria-label="Previous featured home" onClick={() => move(-1)}>‹</button><div className="hero-dots">{slides.map((item,index)=><button type="button" key={item.id} className={index===activeIndex?"active":""} aria-label={"Show featured home "+(index+1)} aria-current={index===activeIndex?"true":undefined} onClick={()=>setActiveIndex(index)} />)}</div><button type="button" aria-label="Next featured home" onClick={()=>move(1)}>›</button></div>}
    <a className="hero-scroll" href="#selected-homes">Scroll to discover <span aria-hidden="true">↓</span></a>
  </section>;
}
