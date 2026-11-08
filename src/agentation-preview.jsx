import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Agentation } from "agentation";
import "./agentation-preview.css";

const pages = [
  { label: "Home", path: "/site/index.html" },
  { label: "Properties", path: "/site/properties.html" },
  {
    label: "Property detail",
    path: "/site/property.html?slug=athens-residence-preview",
  },
  { label: "Admin", path: "/site/admin.html" },
];

function Preview() {
  const [page, setPage] = useState(pages[0]);

  return (
    <main className="preview-shell">
      <header className="preview-bar">
        <div className="preview-brand">
          <span className="preview-mark">A</span>
          <span>
            <strong>Estate Group</strong>
            <small>VISUAL FEEDBACK · LOCAL PREVIEW</small>
          </span>
        </div>
        <nav className="preview-pages" aria-label="Preview page">
          {pages.map((item) => (
            <button
              className={page.path === item.path ? "selected" : ""}
              key={item.label}
              onClick={() => setPage(item)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a className="open-site" href={page.path} target="_blank" rel="noreferrer">
          Open page ↗
        </a>
      </header>
      <iframe className="site-frame" key={page.path} src={page.path} title={`${page.label} page preview`} />
      {import.meta.env.DEV && <Agentation />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<Preview />);
