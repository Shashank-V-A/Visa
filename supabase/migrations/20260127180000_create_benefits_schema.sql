-- Visa Card Benefits: Countries, Issuers, Card Products, Benefits
-- PCI-safe: we never store full card numbers. Users select card product (Country → Bank → Card).

-- Countries (regions we support)
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name_en text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Issuers (banks / card issuing institutions)
CREATE TABLE IF NOT EXISTS issuers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (country_id, name)
);

CREATE INDEX idx_issuers_country ON issuers(country_id);

-- Card products (e.g. HDFC Regalia, SBI SimplyCLICK)
CREATE TABLE IF NOT EXISTS card_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issuer_id uuid NOT NULL REFERENCES issuers(id) ON DELETE CASCADE,
  name text NOT NULL,
  visa_tier text NOT NULL, -- 'signature' | 'infinite' | 'platinum' | 'classic' | 'debit_platinum' etc.
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_card_products_issuer ON card_products(issuer_id);
CREATE INDEX idx_card_products_active ON card_products(is_active) WHERE is_active = true;

-- Benefits (master list; linked to card products via card_product_benefits)
CREATE TABLE IF NOT EXISTS benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL, -- 'travel' | 'dining' | 'shopping' | 'insurance' | 'rewards'
  title_en text NOT NULL,
  title_ta text,
  description_en text NOT NULL,
  description_ta text,
  value_en text NOT NULL,
  value_ta text,
  terms_url text,
  icon text NOT NULL DEFAULT 'Gift',
  is_active boolean DEFAULT true,
  priority int NOT NULL DEFAULT 50,
  valid_from date,
  valid_until date,
  merchants jsonb DEFAULT '[]'::jsonb,
  location_restriction text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_benefits_category ON benefits(category);
CREATE INDEX idx_benefits_active ON benefits(is_active) WHERE is_active = true;

-- Links which benefits each card product has
CREATE TABLE IF NOT EXISTS card_product_benefits (
  card_product_id uuid NOT NULL REFERENCES card_products(id) ON DELETE CASCADE,
  benefit_id uuid NOT NULL REFERENCES benefits(id) ON DELETE CASCADE,
  display_order int NOT NULL DEFAULT 0,
  PRIMARY KEY (card_product_id, benefit_id)
);

CREATE INDEX idx_cpb_card ON card_product_benefits(card_product_id);
CREATE INDEX idx_cpb_benefit ON card_product_benefits(benefit_id);

-- RLS: allow public read for all (benefit data is public info)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE issuers ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_product_benefits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read countries" ON countries FOR SELECT USING (true);
CREATE POLICY "Public read issuers" ON issuers FOR SELECT USING (true);
CREATE POLICY "Public read card_products" ON card_products FOR SELECT USING (true);
CREATE POLICY "Public read benefits" ON benefits FOR SELECT USING (true);
CREATE POLICY "Public read card_product_benefits" ON card_product_benefits FOR SELECT USING (true);
