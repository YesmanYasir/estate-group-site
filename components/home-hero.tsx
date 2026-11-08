"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Property } from "@/types/property";
import { formatPrice } from "@/lib/format";

export function HomeHero({ properties }: { properties: Property[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [listingType, setListingType] = useState("sale");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const slides = properties.length ? properties : [];
  const active = slides[activeIndex % Math.max(slides.length, 1)];

  function move(step: number) {
    if (slides.length < 2) return;
    setActiveIndex((current) => (current + step + slides.length) % slides.length);
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams({ type: listingType });
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (location.trim()) params.set("location", location.trim());
    router.push(`/properties?${params.toString()}`);
  }

  return <section className="home-hero" aria-label="Discover homes in Greece">
    {active && <Image key={active.id} className="hero-photo" src={active.coverUrl} alt={active.alt} fill priority sizes="100vw" unoptimized />}
    <div className="hero-shade" />
    <div className="hero-center">
      <p className="hero-kicker">AIM ESTATE GROUP <span>·</span> GREECE</p>
      <h1>Find a home that <em>moves you.</em></h1>
      <p className="hero-subtitle">A considered collection of exceptional homes, in the places you love.</p>
      <form className="hero-search" onSubmit={search} aria-label="Search properties">
        <label><span className="sr-only">Listing type</span><select value={listingType} onChange={(event) => setListingType(event.target.value)}><option value="sale">For sale</option><option value="rent">For rent</option></select></label>
        <label><span className="sr-only">Maximum price</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">Any price</option><option value="500000">Up to €500,000</option><option value="1000000">Up to €1,000,000</option><option value="2000000">Up to €2,000,000</option><option value="5000000">Up to €5,000,000</option></select></label>
        <label className="location-field"><span className="sr-only">Location</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" autoComplete="address-level2" /></label>
        <button type="submit">Search homes <span aria-hidden="true">⌕</span></button>
      </form>
    </div>
    {active && <div className="hero-feature">
      <div><p>{active.listingType === "rent" ? "HOME FOR RENT" : "HOME FOR SALE"} <span>·</span> {active.city}</p><h2>{active.title}</h2><span className="hero-price">{formatPrice(active.price, active.currency, active.listingType)}</span></div>
      <Link href={`/property/${active.slug}`} aria-label={`View ${active.title}`}>View home <span aria-hidden="true">↗</span></Link>
    </div>}
    {slides.length > 1 && <div className="hero-controls" aria-label="Featured homes">
      <button type="button" aria-label="Previous featured home" onClick={() => move(-1)}>‹</button>
      <div className="hero-dots">{slides.map((item, index) => <button type="button" key={item.id} className={index === activeIndex ? "active" : ""} aria-label={`Show featured home ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => setActiveIndex(index)} />)}</div>
      <button type="button" aria-label="Next featured home" onClick={() => move(1)}>›</button>
    </div>}
    <a className="hero-scroll" href="#selected-homes">Scroll to discover <span aria-hidden="true">↓</span></a>
  </section>;
}
