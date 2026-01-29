-- Seed: More India Visa-linked banks and card products with accurate benefit mapping
-- Data based on publicly available Visa card benefit information. Verify with issuer T&Cs.

-- New Issuers (India – Visa card issuers)
INSERT INTO issuers (country_id, name)
SELECT id, 'Axis Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'Kotak Mahindra Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'Yes Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'IDFC First Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'RBL Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;

-- Card Products: Axis Bank
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Vistara Infinite', 'infinite' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Axis Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Magnus', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Axis Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Privilege', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Axis Bank' AND c.code = 'IN' LIMIT 1;

-- Card Products: Kotak Mahindra Bank
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'White Reserve', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'PVR Gold', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'League Platinum', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' LIMIT 1;

-- Card Products: Yes Bank
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'First Preferred', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Yes Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Prosperity', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'Yes Bank' AND c.code = 'IN' LIMIT 1;

-- Card Products: IDFC First Bank
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Vistara', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'IDFC First Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Millennia', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'IDFC First Bank' AND c.code = 'IN' LIMIT 1;

-- Card Products: RBL Bank
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'ShopRite', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'RBL Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Bajaj Finserv', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'RBL Bank' AND c.code = 'IN' LIMIT 1;

-- Link benefits to card products (accurate per Visa tier)
-- Axis Vistara Infinite (Infinite) – full benefit set like Infinia
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER (ORDER BY b.priority DESC, b.title_en)
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id
CROSS JOIN benefits b
WHERE i.name = 'Axis Bank' AND c.code = 'IN' AND cp.name = 'Vistara Infinite' AND b.is_active = true
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Axis Magnus (Signature) – lounge, travel, dining, shopping, insurance, rewards, concierge
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Axis Bank' AND c.code = 'IN' AND cp.name = 'Magnus'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Milestone & Bonus Points','Concierge & Assistance','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Axis Privilege (Platinum) – fuel, rewards, dining, shopping, insurance
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Axis Bank' AND c.code = 'IN' AND cp.name = 'Privilege'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Kotak White Reserve (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' AND cp.name = 'White Reserve'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Concierge & Assistance','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Kotak PVR Gold (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' AND cp.name = 'PVR Gold'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Kotak League Platinum (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Kotak Mahindra Bank' AND c.code = 'IN' AND cp.name = 'League Platinum'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Flipkart / Amazon / Partner Offers','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Yes Bank First Preferred (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Yes Bank' AND c.code = 'IN' AND cp.name = 'First Preferred'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- Yes Bank Prosperity (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'Yes Bank' AND c.code = 'IN' AND cp.name = 'Prosperity'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Flipkart / Amazon / Partner Offers')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- IDFC First Vistara (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'IDFC First Bank' AND c.code = 'IN' AND cp.name = 'Vistara'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- IDFC First Millennia (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'IDFC First Bank' AND c.code = 'IN' AND cp.name = 'Millennia'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- RBL ShopRite (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'RBL Bank' AND c.code = 'IN' AND cp.name = 'ShopRite'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- RBL Bajaj Finserv (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'RBL Bank' AND c.code = 'IN' AND cp.name = 'Bajaj Finserv'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Flipkart / Amazon / Partner Offers')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;
