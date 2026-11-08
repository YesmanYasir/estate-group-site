"use client";
import { useMemo, useState } from "react";
import type { Property } from "@/types/property";
import { PropertyCard } from "@/components/property-card";
import { filterProperties } from "@/lib/property-utils";
import { GoldenVisaOpportunities } from "@/components/golden-visa-opportunities";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { StyledSelect, type StyledOption } from "@/components/styled-select";

type Filters = { type: string; location: string; category: string; minPrice: string; maxPrice: string; sort: string };
const priceBands = [["250000", "€250k"], ["500000", "€500k"], ["1000000", "€1m"], ["2000000", "€2m"], ["5000000", "€5m"]];
const options = [["all", "all"], ["sale", "sale"], ["rent", "rent"], ["golden_visa", "golden"]] as const;

export function PropertyGrid({ properties, initialFilters, locale = "en" }: { properties: Property[]; initialFilters: Filters; locale?: Locale }) {
  const [filters, setFilters] = useState(initialFilters);
  const visible = useMemo(() => filterProperties(properties, filters), [properties, filters]);
  const activeFilterCount = [filters.location, filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length + (filters.type !== "all" ? 1 : 0);
  const hasFilters = activeFilterCount > 0;
  function updateFilters(next: Filters) {
    setFilters(next);
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(next)) if (value && !(key === "type" && value === "all") && !(key === "sort" && value === "recommended")) params.set(key, value);
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`);
  }
  function change<K extends keyof Filters>(key: K, value: Filters[K]) { updateFilters({ ...filters, [key]: value }); }
  function clearFilters() { updateFilters({ type: "all", location: "", category: "", minPrice: "", maxPrice: "", sort: "recommended" }); }
  function removeFilter(key: keyof Filters) { change(key, key === "type" ? "all" : key === "sort" ? "recommended" : ""); }
  const loc = locale === "tr" ? "tr-TR" : locale === "el" ? "el-GR" : "en-IE";
  const categoryOptions: StyledOption[] = [{value:"",label:t(locale,"allTypes")},{value:"Apartment",label:locale==="tr"?"Daire":locale==="el"?"Διαμερίσματα":"Apartments"},{value:"House",label:locale==="tr"?"Ev":locale==="el"?"Κατοικίες":"Houses"},{value:"Villa",label:locale==="el"?"Βίλες":"Villas"},{value:"Penthouse",label:locale==="el"?"Ρετιρέ":"Penthouses"},{value:"Land",label:locale==="tr"?"Arsa":locale==="el"?"Οικόπεδα":"Land"},{value:"Development",label:locale==="tr"?"Projeler":locale==="el"?"Αναπτύξεις":"Developments"}];
  const minPriceOptions: StyledOption[] = [{value:"",label:t(locale,"noMin")},...priceBands.slice(0,-1).map(([value,label])=>({value,label,disabled:Boolean(filters.maxPrice&&Number(value)>Number(filters.maxPrice))}))];
  const maxPriceOptions: StyledOption[] = [{value:"",label:t(locale,"noMax")},...priceBands.map(([value,label])=>({value,label,disabled:Boolean(filters.minPrice&&Number(value)<Number(filters.minPrice))}))];
  const sortOptions: StyledOption[] = [{value:"recommended",label:t(locale,"recommended")},{value:"newest",label:t(locale,"newest")},{value:"price-asc",label:t(locale,"lowHigh")},{value:"price-desc",label:t(locale,"highLow")}];
  return <>
    <section className="listing-filter-panel" aria-label={t(locale, "search")}>
      <label className="search-box"><SearchIcon/><span className="sr-only">{t(locale, "search")}</span><input type="search" value={filters.location} onChange={(event) => change("location", event.target.value)} placeholder={locale === "tr" ? "Bölge veya ilan ara" : locale === "el" ? "Αναζήτηση περιοχής ή ακινήτου" : "Search by area or property"}/>{filters.location && <button type="button" className="search-clear" onClick={() => removeFilter("location")} aria-label={t(locale,"clear")}>×</button>}</label>
      <div className="filter-row">
        <fieldset className="listing-type-control"><legend className="sr-only">{t(locale,"offer")}</legend>{options.map(([value, label]) => <button type="button" key={value} aria-pressed={filters.type === value} onClick={() => change("type", value)} className={filters.type === value ? "type-option selected" : "type-option"}>{t(locale,label)}</button>)}</fieldset>
        <label className="filter-field"><span>{t(locale,"propertyType")}</span><StyledSelect ariaLabel={t(locale,"propertyType")} value={filters.category} options={categoryOptions} onChange={(value)=>change("category",value)}/></label>
        <div className="price-range" aria-label={t(locale,"price")}><label className="filter-field"><span>{t(locale,"minPrice")}</span><StyledSelect ariaLabel={t(locale,"minPrice")} value={filters.minPrice} options={minPriceOptions} onChange={(value)=>change("minPrice",value)}/></label><span className="range-divider" aria-hidden="true">—</span><label className="filter-field"><span>{t(locale,"maxPrice")}</span><StyledSelect ariaLabel={t(locale,"maxPrice")} value={filters.maxPrice} options={maxPriceOptions} onChange={(value)=>change("maxPrice",value)}/></label></div>
        <label className="filter-field sort-field"><span>{t(locale,"sort")}</span><StyledSelect ariaLabel={t(locale,"sort")} value={filters.sort} options={sortOptions} onChange={(value)=>change("sort",value)}/></label>
        {hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>{t(locale,"clear")} <span>{activeFilterCount}</span></button>}
      </div>
      <div className="listing-results"><p role="status" aria-live="polite"><strong>{visible.length}</strong> {visible.length === 1 ? t(locale,"home") : t(locale,"homes")} {t(locale,"explore")}</p>{hasFilters && <div className="active-filters" aria-label={t(locale,"clear")}>{filters.type!=="all"&&<button type="button" onClick={()=>removeFilter("type")}>{filters.type==="golden_visa"?t(locale,"golden"):filters.type==="rent"?t(locale,"rent"):t(locale,"sale")}<RemoveIcon/></button>}{filters.location&&<button type="button" onClick={()=>removeFilter("location")}>{filters.location}<RemoveIcon/></button>}{filters.category&&<button type="button" onClick={()=>removeFilter("category")}>{filters.category}<RemoveIcon/></button>}{filters.minPrice&&<button type="button" onClick={()=>removeFilter("minPrice")}>{locale==="tr"?"En az":"From"} €{Number(filters.minPrice).toLocaleString(loc)}<RemoveIcon/></button>}{filters.maxPrice&&<button type="button" onClick={()=>removeFilter("maxPrice")}>{locale==="tr"?"En çok":"Up to"} €{Number(filters.maxPrice).toLocaleString(loc)}<RemoveIcon/></button>}</div>}</div>
    </section>
    {filters.type === "sale" && <GoldenVisaOpportunities locale={locale}/>}
    {visible.length ? <div className="property-grid" id="property-results">{visible.map((property,index)=><PropertyCard key={property.id} property={property} index={index} locale={locale}/>)}</div> : filters.type !== "golden_visa" && <div className="empty-state"><p>{t(locale,"noResults")}</p><button className="button button-dark" type="button" onClick={clearFilters}>{t(locale,"tryAll")}</button></div>}
  </>;
}
function SearchIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.4 4.4"/></svg>; }
function RemoveIcon() { return <svg aria-hidden="true" viewBox="0 0 16 16" className="remove-filter-icon" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m4 4 8 8m0-8-8 8"/></svg>; }
