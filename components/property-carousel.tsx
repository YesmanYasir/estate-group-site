"use client";

import { useRef } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";
import type { Locale } from "@/lib/i18n";

export function PropertyCarousel({ properties, locale = "en" }: { properties: Property[]; locale?: Locale }) {
  const track = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: "smooth" });
  }
  return <div className="carousel-shell">
    <div className="property-carousel" ref={track} role="region" aria-roledescription="carousel" aria-label="Selected homes">
      {properties.map((property, index) => <div className="carousel-item" key={property.id}><PropertyCard property={property} index={index} compact locale={locale} /></div>)}
    </div>
    <button className="carousel-arrow carousel-arrow-prev" type="button" onClick={() => scroll(-1)} aria-label="Previous homes">‹</button>
    <button className="carousel-arrow carousel-arrow-next" type="button" onClick={() => scroll(1)} aria-label="Next homes">›</button>
  </div>;
}
