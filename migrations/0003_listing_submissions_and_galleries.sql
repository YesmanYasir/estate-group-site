DROP INDEX IF EXISTS idx_properties_public;
ALTER TABLE properties RENAME TO properties_legacy;
CREATE TABLE properties (
  id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, city TEXT NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'golden_visa')),
  price REAL NOT NULL CHECK (price >= 0), currency TEXT NOT NULL DEFAULT 'EUR',
  bedrooms INTEGER NOT NULL DEFAULT 0, bathrooms INTEGER NOT NULL DEFAULT 0, area REAL NOT NULL DEFAULT 0,
  cover_url TEXT NOT NULL, images_json TEXT NOT NULL DEFAULT '[]', alt TEXT NOT NULL, description TEXT NOT NULL,
  features_json TEXT NOT NULL DEFAULT '[]', property_type TEXT NOT NULL DEFAULT 'Villa',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'draft', 'published')),
  submitted_by TEXT, submitted_name TEXT, submitted_phone TEXT, source_url TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO properties (id, slug, title, city, listing_type, price, currency, bedrooms, bathrooms, area, cover_url, images_json, alt, description, features_json, property_type, status, created_at, updated_at)
SELECT id, slug, title, city, listing_type, price, currency, bedrooms, bathrooms, area, cover_url, '[]', alt, description, features_json, property_type, status, created_at, updated_at FROM properties_legacy;
DROP TABLE properties_legacy;
CREATE INDEX idx_properties_public ON properties(status, created_at DESC);
CREATE TABLE golden_visa_enquiries (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_golden_visa_enquiries_created ON golden_visa_enquiries(created_at DESC);
