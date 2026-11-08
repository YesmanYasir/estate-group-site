"use client";

import { useRef } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";

export function PropertyCarousel({ properties }: { properties: Property[] }) {
  const track = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: "smooth" });
  }
  return <div className="carousel-shell">
    <div className="carousel-controls">
      <button type="button" onClick={() => scroll(-1)} aria-label="Previous homes">‹</button>
      <button type="button" onClick={() => scroll(1)} aria-label="Next homes">›</button>
    </div>
    <div className="property-carousel" ref={track} aria-label="Selected homes">
      {properties.map((property, index) => <div className="carousel-item" key={property.id}><PropertyCard property={property} index={index} compact /></div>)}
    </div>
  </div>;
}
