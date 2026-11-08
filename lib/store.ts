import { create } from "zustand";
type ListingFilters={type:string;query:string;setType:(type:string)=>void;setQuery:(query:string)=>void};
export const useListingFilters=create<ListingFilters>((set)=>({type:"all",query:"",setType:(type)=>set({type}),setQuery:(query)=>set({query})}));
