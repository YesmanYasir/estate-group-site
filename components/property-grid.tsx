"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";
import { filterProperties } from "@/lib/property-utils";

type Filters = { type: string; location: string; category: string; minPrice: string; maxPrice: string; sort: string };
const defaultFilters: Filters = { type: "all", location: "", category: "", minPrice: "", maxPrice: "", sort: "recommended" };
const priceBands = [
  ["250000", "€250k"], ["500000", "€500k"], ["1000000", "€1m"], ["2000000", "€2m"], ["5000000", "€5m"],
];

export function PropertyGrid({ properties, initialFilters }: { properties: Property[]; initialFilters: Filters }) {
  const [filters, setFilters] = useState(initialFilters);
  const visible = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  const activeFilterCount = [filters.location, filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length + (filters.type !== "all" ? 1 : 0);
  const hasFilters = activeFilterCount > 0;

  function updateFilters(next: Filters) {
    setFilters(next);
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(next)) {
      if (value && !(key === "type" && value === "all") && !(key === "sort" && value === "recommended")) params.set(key, value);
    }
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
  }

  function change<K extends keyof Filters>(key: K, value: Filters[K]) {
    updateFilters({ ...filters, [key]: value });
  }

  function clearFilters() { updateFilters(defaultFilters); }

  function removeFilter(key: keyof Filters) { change(key, defaultFilters[key]); }

  return <>
    <section className="listing-filter-panel" aria-label="Search and filter homes">
      <label className="search-box">
        <SearchIcon />
        <span className="sr-only">Search by location or keyword</span>
        <input type="search" value={filters.location} onChange={(event) => change("location", event.target.value)} placeholder="Search by area or property" />
        {filters.location && <button type="button" className="search-clear" onClick={() => removeFilter("location")} aria-label="Clear search"><RemoveIcon/></button>}
      </label>
      <div className="filter-row">
        <fieldset className="listing-type-control">
          <legend className="sr-only">Listing availability</legend>
          {[["all", "All homes"], ["sale", "For sale"], ["rent", "For rent"]].map(([value, label]) => <button type="button" key={value} aria-pressed={filters.type === value} onClick={() => change("type", value)} className={filters.type === value ? "type-option selected" : "type-option"}>{label}</button>)}
        </fieldset>
        <label className="filter-field"><span>Property type</span><select aria-label="Property type" value={filters.category} onChange={(event: ChangeEvent<HTMLSelectElement>) => change("category", event.target.value)}><option value="">All types</option><option value="Apartment">Apartments</option><option value="House">Houses</option><option value="Villa">Villas</option><option value="Penthouse">Penthouses</option><option value="Land">Land</option><option value="Development">Developments</option></select></label>
        <div className="price-range" aria-label="Price range">
          <label className="filter-field"><span>Min. price</span><select aria-label="Minimum price" value={filters.minPrice} onChange={(event) => change("minPrice", event.target.value)}><option value="">No minimum</option>{priceBands.slice(0, -1).map(([value, label]) => <option key={value} value={value} disabled={Boolean(filters.maxPrice && Number(value) > Number(filters.maxPrice))}>{label}</option>)}</select></label>
          <span className="range-divider" aria-hidden="true">—</span>
          <label className="filter-field"><span>Max. price</span><select aria-label="Maximum price" value={filters.maxPrice} onChange={(event) => change("maxPrice", event.target.value)}><option value="">No maximum</option>{priceBands.map(([value, label]) => <option key={value} value={value} disabled={Boolean(filters.minPrice && Number(value) < Number(filters.minPrice))}>Up to {label}</option>)}</select></label>
        </div>
        <label className="filter-field sort-field"><span>Sort by</span><select aria-label="Sort properties" value={filters.sort} onChange={(event) => change("sort", event.target.value)}><option value="recommended">Recommended</option><option value="newest">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
        {hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Clear all <span>{activeFilterCount}</span></button>}
      </div>
      <div className="listing-results">
        <p role="status" aria-live="polite"><strong>{visible.length}</strong> {visible.length === 1 ? "home" : "homes"} <span>to explore</span></p>
        {hasFilters && <div className="active-filters" aria-label="Active filters">
          {filters.type !== "all" && <button type="button" onClick={() => removeFilter("type")}>{filters.type === "sale" ? "For sale" : "For rent"}<RemoveIcon/></button>}
          {filters.location && <button type="button" onClick={() => removeFilter("location")}>{filters.location}<RemoveIcon/></button>}
          {filters.category && <button type="button" onClick={() => removeFilter("category")}>{filters.category}<RemoveIcon/></button>}
          {filters.minPrice && <button type="button" onClick={() => removeFilter("minPrice")}>From €{Number(filters.minPrice).toLocaleString("en-IE")}<RemoveIcon/></button>}
          {filters.maxPrice && <button type="button" onClick={() => removeFilter("maxPrice")}>Up to €{Number(filters.maxPrice).toLocaleString("en-IE")}<RemoveIcon/></button>}
        </div>}
      </div>
    </section>
    {visible.length ? <div className="property-grid" id="property-results">{visible.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}</div> : <div className="empty-state"><p>No homes match those filters.</p><button className="button button-dark" type="button" onClick={clearFilters}>Clear filters and see all homes</button></div>}
  </>;
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.4 4.4"/></svg>;
}

function RemoveIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="remove-filter-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m4 4 8 8m0-8-8 8"/></svg>;
}
