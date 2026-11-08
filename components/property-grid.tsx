"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";
import { filterProperties } from "@/lib/property-utils";

type Filters = { type: string; location: string; category: string; maxPrice: string };

export function PropertyGrid({ properties, initialFilters }: { properties: Property[]; initialFilters: Filters }) {
  const [filters, setFilters] = useState(initialFilters);
  const visible = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  const hasFilters = Boolean(filters.location || filters.category || filters.maxPrice || filters.type !== "all");
  function clearFilters() { setFilters({ type: "all", location: "", category: "", maxPrice: "" }); }

  return <>
    <div className="listing-toolbar">
      <label className="search-box"><span aria-hidden="true">⌕</span><input value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} placeholder="Search by area or property" aria-label="Search by area or property" /></label>
      <label className="filter-select"><span className="sr-only">Property type</span><select aria-label="Property type" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">All property types</option><option value="Apartment">Apartments</option><option value="House">Houses</option><option value="Villa">Villas</option><option value="Penthouse">Penthouses</option><option value="Land">Land</option><option value="Development">Developments</option></select></label>
      <label className="filter-select"><span className="sr-only">Maximum price</span><select aria-label="Maximum price" value={filters.maxPrice} onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}><option value="">Any price</option><option value="500000">Up to €500,000</option><option value="1000000">Up to €1,000,000</option><option value="2000000">Up to €2,000,000</option><option value="5000000">Up to €5,000,000</option></select></label>
      <div className="filters" aria-label="Listing type">{[["all", "All homes"], ["sale", "For sale"], ["rent", "For rent"]].map(([value, label]) => <button type="button" key={value} onClick={() => setFilters({ ...filters, type: value })} className={filters.type === value ? "filter active" : "filter"}>{label}</button>)}</div>
      <span className="result-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "HOME" : "HOMES"}</span>
      {hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>}
    </div>
    {visible.length ? <div className="property-grid">{visible.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div> : <div className="empty-state"><p>No homes match those filters.</p><button className="button button-dark" type="button" onClick={clearFilters}>See all homes</button></div>}
  </>;
}
