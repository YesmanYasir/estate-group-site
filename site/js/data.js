(function(){
  const c=window.ESTATE_CONFIG;
  const validId=c.sanityProjectId && c.sanityProjectId!=="YOUR_SANITY_PROJECT_ID";
  const query='*[_type == "property" && status == "available"] | order(featured desc, _createdAt desc) { _id, "slug": slug.current, title, city, neighborhood, country, propertyType, listingType, status, price, currency, bedrooms, bathrooms, area, shortDescription, description, features, featured, coverImage {alt, asset->{url}}, gallery[]{alt, asset->{url}} }';
  function mapSanity(p){return {id:p._id,slug:p.slug||p._id,title:p.title||"Property",city:p.city||"",neighborhood:p.neighborhood||"",country:p.country||"Greece",propertyType:p.propertyType||"Property",listingType:p.listingType||"sale",status:p.status||"available",price:Number(p.price)||0,currency:p.currency||c.currency,bedrooms:Number(p.bedrooms)||0,bathrooms:Number(p.bathrooms)||0,area:Number(p.area)||0,shortDescription:p.shortDescription||"",description:p.description||"",features:Array.isArray(p.features)?p.features:[],featured:!!p.featured,demo:false,coverUrl:p.coverImage?.asset?.url||"",alt:p.coverImage?.alt||p.title||"Property photo",gallery:Array.isArray(p.gallery)?p.gallery.map(g=>({url:g?.asset?.url||"",alt:g?.alt||"Property photo"})).filter(g=>g.url):[]}}
  async function getAll(){
    if(validId){try{const u=`https://${c.sanityProjectId}.apicdn.sanity.io/v${c.sanityApiVersion}/data/query/${encodeURIComponent(c.sanityDataset)}?query=${encodeURIComponent(query)}`;const r=await fetch(u,{headers:{Accept:"application/json"}});if(!r.ok)throw new Error("CMS request failed");const j=await r.json();return {items:(j.result||[]).map(mapSanity),demo:false,error:false}}catch(e){console.warn("Sanity listing request failed; using preview data.",e)}}
    try{const r=await fetch("data/demo-properties.json");if(r.ok){const items=await r.json();return {items,demo:true,error:false}}}catch(e){}
    return {items:[],demo:!validId,error:true}
  }
  window.EstateData={getAll,validId};
})();
