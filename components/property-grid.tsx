"use client";
import { useMemo, useState } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";
import { useListingFilters } from "@/lib/store";
export function PropertyGrid({ properties }: { properties: Property[] }) {
  const { type, query, setType, setQuery } = useListingFilters();
  const visible = useMemo(() => properties.filter((p) => (type === "all" || p.listingType === type) && `${p.title} ${p.city}`.toLowerCase().includes(query.toLowerCase())), [properties, type, query]);
  return <><div className="listing-toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by area or name" aria-label="Search properties" /></label><div className="filters" aria-label="Filter listings">{[["all", "All homes"], ["sale", "For sale"], ["rent", "For rent"]].map(([v, label]) => <button key={v} onClick={() => setType(v)} className={type === v ? "filter active" : "filter"}>{label}</button>)}</div><span className="result-count">{String(visible.length).padStart(2,"0")} LISTINGS</span></div>
  {visible.length ? <div className="property-grid">{visible.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}</div> : <p className="empty-state">No properties match that search. Try another area or remove a filter.</p>}</>;
}
