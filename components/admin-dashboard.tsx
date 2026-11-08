"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Property, PropertyType } from "@/types/property";
import { formatPrice } from "@/lib/format";

const emptyForm = {
  title: "", city: "", listingType: "sale", propertyType: "Villa" as PropertyType,
  price: "", coverUrl: "", description: "", bedrooms: "", bathrooms: "", area: "",
  alt: "", features: "", status: "published",
};
const types: PropertyType[] = ["Apartment", "House", "Villa", "Penthouse", "Land", "Development"];

export function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProperties() {
    try {
      const response = await fetch("/api/admin/properties");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The listing list could not be loaded.");
      setProperties(data.properties || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The listing list could not be loaded.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => { void loadProperties(); }, []);

  async function upload(file: File) {
    const data = new FormData();
    data.set("file", file);
    setMessage("Uploading photo…");
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) { setMessage(result.error || "The photo could not be uploaded."); return; }
    setForm((current) => ({ ...current, coverUrl: result.url }));
    setMessage("Photo ready.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const body = {
      ...form,
      alt: form.alt.trim() || `${form.title} in ${form.city}`,
      price: Number(form.price), bedrooms: Number(form.bedrooms || 0),
      bathrooms: Number(form.bathrooms || 0), area: Number(form.area || 0),
      features: form.features.split(",").map((feature) => feature.trim()).filter(Boolean),
    };
    try {
      const response = await fetch("/api/admin/properties", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The property could not be saved.");
      setProperties((current) => [data.property, ...current]);
      setForm(emptyForm);
      setMessage(body.status === "draft" ? "Draft saved. Publish it when you are ready." : "Property is now on the website.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The property could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function togglePublication(property: Property) {
    const status = property.status === "published" ? "draft" : "published";
    const response = await fetch(`/api/admin/properties?id=${encodeURIComponent(property.id)}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    const data = await response.json();
    if (!response.ok) { setMessage(data.error || "The listing status could not be changed."); return; }
    setProperties((current) => current.map((item) => item.id === property.id ? data.property : item));
    setMessage(status === "published" ? "Property published." : "Property moved to drafts.");
  }

  return <div className="admin-layout">
    <section className="admin-list" aria-labelledby="admin-list-title">
      <div className="admin-list-heading"><div><p className="eyebrow">YOUR WEBSITE INVENTORY</p><h2 id="admin-list-title">Properties</h2></div><div className="admin-list-actions"><span>{properties.length} TOTAL</span><button type="button" onClick={signOut}>Sign out</button></div></div>
      {busy ? <p>Loading properties…</p> : properties.length === 0 ? <p>No properties yet. Add the first one with the form.</p> : properties.map((property) => <article className="admin-row" key={property.id}><div><strong>{property.title}</strong><small>{property.city} · {formatPrice(property.price, property.currency, property.listingType)} · {property.status}</small></div><button type="button" onClick={() => void togglePublication(property)}>{property.status === "published" ? "Unpublish" : "Publish"}</button></article>)}
    </section>
    <section className="admin-form-wrap" aria-labelledby="admin-form-title">
      <p className="eyebrow">ADD A HOME</p><h2 id="admin-form-title">Property details</h2>
      <p className="admin-help">Enter the essentials, add a photo, then publish it to the website.</p>
      <form className="admin-form" onSubmit={submit}>
        <label>Property title<input required maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Villa by the sea" /></label>
        <div className="form-pair"><label>Location<input required maxLength={120} value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="Paros, Greece" /></label><label>Property type<select value={form.propertyType} onChange={(event) => setForm({ ...form, propertyType: event.target.value as PropertyType })}>{types.map((type) => <option key={type}>{type}</option>)}</select></label></div>
        <div className="form-pair"><label>Offer<select value={form.listingType} onChange={(event) => setForm({ ...form, listingType: event.target.value })}><option value="sale">For sale</option><option value="rent">For rent</option></select></label><label>Price (€)<input type="number" min="0" step="1" required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="850000" /></label></div>
        <label>Property photo<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); }} /><small>{form.coverUrl.startsWith("/api/media/") ? "Photo uploaded." : "Upload a photo up to 8 MB, or paste a direct HTTPS image link below."}</small></label>
        <label>Or paste a photo link<input type="url" placeholder="https://…" value={form.coverUrl.startsWith("/api/media/") ? "" : form.coverUrl} onChange={(event) => setForm({ ...form, coverUrl: event.target.value })} /></label>
        <label>Description<textarea rows={3} required maxLength={3000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe the home and what makes it special." /></label>
        <details className="admin-optional"><summary>More details (optional)</summary><div className="form-pair"><label>Bedrooms<input type="number" min="0" value={form.bedrooms} onChange={(event) => setForm({ ...form, bedrooms: event.target.value })} /></label><label>Bathrooms<input type="number" min="0" value={form.bathrooms} onChange={(event) => setForm({ ...form, bathrooms: event.target.value })} /></label></div><label>Area in m²<input type="number" min="0" value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} /></label><label>Features, separated by commas<input value={form.features} onChange={(event) => setForm({ ...form, features: event.target.value })} placeholder="Sea view, private garden" /></label><label>Visibility<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="published">Publish immediately</option><option value="draft">Save as draft</option></select></label></details>
        {message && <p role="status" className="form-message">{message}</p>}
        <button className="button button-dark" disabled={saving}>{saving ? "Saving…" : form.status === "draft" ? "Save as draft" : "Add property to website"}</button>
      </form>
    </section>
  </div>;
}
