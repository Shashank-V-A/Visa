-- Seed: India – Countries, Issuers, Card Products, Benefits
-- Data based on publicly available Visa card benefit information. Verify with issuer and Visa T&Cs.
-- For authoritative, up-to-date mapping of which card has which benefit, integrate Visa API (see VISA_API.md)
-- and sync into benefits / card_product_benefits. Location-based logic (e.g. AI) uses Bangalore, India.

INSERT INTO countries (code, name_en) VALUES ('IN', 'India') ON CONFLICT (code) DO NOTHING;

-- Issuers
INSERT INTO issuers (country_id, name)
SELECT id, 'HDFC Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'SBI Card' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;
INSERT INTO issuers (country_id, name)
SELECT id, 'ICICI Bank' FROM countries WHERE code = 'IN' LIMIT 1
ON CONFLICT (country_id, name) DO NOTHING;

-- Card Products (HDFC)
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Regalia', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'HDFC Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Infinia', 'infinite' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'HDFC Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'MoneyBack+', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'HDFC Bank' AND c.code = 'IN' LIMIT 1;

-- Card Products (SBI)
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'SimplyCLICK', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'SBI Card' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'SimplySAVE', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'SBI Card' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'BPCL Octane', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'SBI Card' AND c.code = 'IN' LIMIT 1;

-- Card Products (ICICI)
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Amazon Pay', 'signature' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'ICICI Bank' AND c.code = 'IN' LIMIT 1;
INSERT INTO card_products (issuer_id, name, visa_tier)
SELECT i.id, 'Coral', 'platinum' FROM issuers i
JOIN countries c ON c.id = i.country_id WHERE i.name = 'ICICI Bank' AND c.code = 'IN' LIMIT 1;

-- Benefits (master list). terms_url points to generic/issuer T&C; in production use exact URLs.
INSERT INTO benefits (category, title_en, title_ta, description_en, description_ta, value_en, value_ta, terms_url, icon, priority, valid_until, merchants, location_restriction) VALUES
('travel', 'Airport Lounge Access', 'விமான நிலைய லவுஞ்ச் அணுகல்',
 'Complimentary access to domestic and international airport lounges. Number of free visits and lounge networks vary by card. Check your card''s program for current list.',
 'உள்ளூர் மற்றும் சர்வதேச விமான நிலைய லவுஞ்ச்களுக்கு இலவச அணுகல். இலவச வருகைகள் மற்றும் லவுஞ்ச் நெட்வொர்க்குகள் கார்டின் படி மாறுபடும்.',
 'Complimentary visits', 'இலவச வருகைகள்',
 'https://www.visa.co.in/support/consumer/visa-lounge.html', 'Plane', 95, '2026-12-31',
 '["Priority Pass", "Plaza Premium", "Lounges by bank"]'::jsonb, 'India'),
('insurance', 'Travel Insurance', 'பயண காப்பீடு',
 'Coverage for trip cancellation, medical emergencies, lost baggage and more when you pay for travel with your card. Limits vary by card; see issuer T&C.',
 'கார்டு மூலம் பயணம் செலுத்தும்போது பயண ரத்து, மருத்துவ அவசரநிலை, தொலைந்த சாமான் முதலியன. வரம்புகள் கார்டின்படி மாறுபடும்.',
 'As per card T&C', 'கார்டு விதிமுறைப்படி',
 'https://www.visa.co.in/support/consumer/visa-signature-benefits.html', 'Shield', 90, NULL, '[]'::jsonb, NULL),
('rewards', 'Fuel Surcharge Waiver', 'எரிபொருள் கட்டண விலக்கு',
 '1% fuel surcharge waiver at petrol pumps in India. Typically applies on transactions above a minimum (e.g. ₹400–500). Monthly cap varies by card.',
 'இந்தியாவில் பெட்ரோல் பம்புகளில் 1% எரிபொருள் கட்டண விலக்கு. குறைந்தபட்ச தொகை (எ.கா. ₹400–500) மேல் பொருந்தும். மாத வரம்பு கார்டின்படி மாறுபடும்.',
 '1% waiver', '1% விலக்கு',
 'https://www.visa.co.in/support/consumer/fuel-surcharge-waiver.html', 'Fuel', 75, NULL, '[]'::jsonb, 'India'),
('dining', 'Dining & Restaurant Offers', 'உணவக சலுகைகள்',
 'Discounts and 1+1 on dining at partner restaurants. Some cards include EazyDiner Prime or similar. Check your card''s offer list and minimum spend.',
 'பங்குதாரர் உணவகங்களில் தள்ளுபடிகள் மற்றும் 1+1. சில கார்டுகளில் இசி டைனர் பிரைம் உள்ளிட்டவை. கார்டின் சலுகை பட்டியல் மற்றும் குறைந்தபட்ச செலவைப் பாருங்கள்.',
 'Up to 20–25% or 1+1', '20–25% அல்லது 1+1 வரை',
 'https://www.visa.co.in/support/consumer/visa-signature-benefits.html', 'Utensils', 85, NULL,
 '["EazyDiner", "Dineout", "Partner restaurants"]'::jsonb, 'India'),
('shopping', 'Online Shopping & Rewards', 'ஆன்லைன் ஷாப்பிங் மற்றும் வெகுமதிகள்',
 'Accelerated reward points or cashback on e-commerce (Amazon, Flipkart, etc.). Percentages and caps differ by card and merchant. See your card''s reward structure.',
 'இ-காமர்ஸில் (அமேசான், ஃப்ளிப்கார்ட் முதலியன) அதிகரித்த வெகுமதி புள்ளிகள் அல்லது கேஷ்பேக். சதவீதம் மற்றும் வரம்புகள் கார்டு மற்றும் வணிகரின்படி மாறுபடும்.',
 'As per card (e.g. 5X, 10X)', 'கார்டின்படி (எ.கா. 5X, 10X)',
 'https://www.visa.co.in/support/consumer/rewards.html', 'ShoppingBag', 88, NULL,
 '["Amazon", "Flipkart", "Myntra", "Other partners"]'::jsonb, 'India'),
('insurance', 'Purchase Protection', 'வாங்குதல் பாதுகாப்பு',
 'Protection against theft or damage for items bought with your card. Coverage period and amount vary by card. Subject to issuer terms.',
 'கார்டு மூலம் வாங்கிய பொருட்களுக்கு திருட்டு அல்லது சேதம் எதிராக பாதுகாப்பு. காலம் மற்றும் தொகை கார்டின்படி மாறுபடும்.',
 'As per card (e.g. 90 days)', 'கார்டின்படி (எ.கா. 90 நாள்)',
 'https://www.visa.co.in/support/consumer/purchase-protection.html', 'ShieldCheck', 70, NULL, '[]'::jsonb, NULL),
('insurance', 'Extended Warranty', 'நீட்டிக்கப்பட்ட உத்தரவாதம்',
 'Doubling of manufacturer warranty up to 1 extra year on eligible items purchased with your card. Conditions apply per issuer.',
 'கார்டு மூலம் வாங்கிய தகுதியான பொருட்களில் உற்பத்தியாளர் உத்தரவாதத்தை 1 கூடுதல் ஆண்டு வரை இரட்டிப்பாக்குதல்.',
 '+1 year', '+1 ஆண்டு',
 'https://www.visa.co.in/support/consumer/extended-warranty.html', 'Clock', 68, NULL, '[]'::jsonb, NULL),
('rewards', 'Reward Points & Redemptions', 'வெகுமதி புள்ளிகள் மற்றும் ரீடெம்ப்ஷன்ஸ்',
 'Earn reward points on spends; redeem for travel, vouchers, merchandise, or statement credit. Earning and redemption rules are card-specific.',
 'செலவுகளில் வெகுமதி புள்ளிகள் சம்பாதிக்கவும்; பயணம், வௌ்சர்கள், பொருட்கள் அல்லது ஸ்டேட்மென்ட் கிரெடிட் மூலம் ரீடீம் செய்யவும்.',
 'Card-specific', 'கார்டு சார்ந்தது',
 'https://www.visa.co.in/support/consumer/rewards.html', 'Gift', 72, NULL, '[]'::jsonb, NULL),
('rewards', 'Milestone & Bonus Points', 'மைல்ஸ்டோன் மற்றும் போனஸ் புள்ளிகள்',
 'Bonus points on achieving quarterly or annual spend milestones. Thresholds and bonus amounts vary by card.',
 'காலாண்டு அல்லது வருடாந்திர செலவு மைல்ஸ்டோன்களை அடையும்போது போனஸ் புள்ளிகள். வாசல்கள் மற்றும் போனஸ் தொகைகள் கார்டின்படி மாறுபடும்.',
 'As per card', 'கார்டின்படி',
 'https://www.visa.co.in/support/consumer/rewards.html', 'Trophy', 65, NULL, '[]'::jsonb, NULL),
('travel', 'Concierge & Assistance', 'கன்சியர்ஜ் மற்றும் உதவி',
 '24/7 concierge for travel, dining, and lifestyle requests. Available on Visa Signature and above. Check your card''s specific inclusions.',
 'பயணம், உணவகம் மற்றும் வாழ்க்கை முறை கோரிக்கைகளுக்கு 24/7 கன்சியர்ஜ். விசா சிக்னேச்சர் மற்றும் மேலுள்ள கார்டுகளில் கிடைக்கும்.',
 '24/7', '24/7',
 'https://www.visa.co.in/support/consumer/visa-signature-benefits.html', 'HeadphonesIcon', 78, NULL, '[]'::jsonb, NULL),
('dining', 'Zomato / Swiggy & Food Delivery', 'ஜோமாட்டோ / ஸ்விகி மற்றும் உணவு டெலிவரி',
 'Complimentary or discounted membership (e.g. Zomato Gold, Swiggy One) or cashback on food delivery. Offer and validity vary by card.',
 'இலவச அல்லது தள்ளுபடி உறுப்பினர் (எ.கா. ஜோமாட்டோ கோல்ட், ஸ்விகி ஒன்) அல்லது உணவு டெலிவரியில் கேஷ்பேக். சலுகை மற்றும் செல்லுபடி கார்டின்படி மாறுபடும்.',
 'Card-specific', 'கார்டு சார்ந்தது',
 'https://www.visa.co.in/support/consumer/visa-signature-benefits.html', 'Pizza', 80, NULL,
 '["Zomato", "Swiggy"]'::jsonb, 'India'),
('shopping', 'Flipkart / Amazon / Partner Offers', 'ஃப்ளிப்கார்ட் / அமேசான் / பங்குதாரர் சலுகைகள்',
 'Instant discounts, SuperCoins, or extra reward points on Flipkart, Amazon, and other partners. Minimum spend and offer limits apply. Check your card''s offer page.',
 'ஃப்ளிப்கார்ட், அமேசான் மற்றும் பிற பங்குதாரர்களில் உடனடி தள்ளுபடிகள், சூப்பர்காயின்ஸ் அல்லது கூடுதல் வெகுமதி புள்ளிகள். குறைந்தபட்ச செலவு மற்றும் சலுகை வரம்புகள் பொருந்தும்.',
 'As per card & merchant', 'கார்டு மற்றும் வணிகரின்படி',
 'https://www.visa.co.in/support/consumer/shopping-offers.html', 'Coins', 82, NULL,
 '["Flipkart", "Amazon", "Myntra", "Ajio"]'::jsonb, 'India'),
('travel', 'Hotel & Travel Bookings', 'ஹோட்டல் மற்றும் பயண புக்கிங்',
 'Discounts or bonus points on hotel and flight bookings via partner portals (e.g. Goibibo, MakeMyTrip, Yatra). Conditions and partners vary by card.',
 'பங்குதாரர் போர்டல்கள் (எ.கா. கோ இபிபோ, மேக்மைடிரிப், யாத்ரா) வழியாக ஹோட்டல் மற்றும் விமான புக்கிங்களில் தள்ளுபடிகள் அல்லது போனஸ் புள்ளிகள்.',
 'As per card', 'கார்டின்படி',
 'https://www.visa.co.in/support/consumer/visa-signature-benefits.html', 'Hotel', 84, NULL,
 '["MakeMyTrip", "Goibibo", "Yatra", "Booking.com"]'::jsonb, 'India');

-- Link benefits to card products. (We assign a reasonable set per card; in production, maintain via admin.)
-- HDFC Regalia (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'HDFC Bank' AND c.code = 'IN' AND cp.name = 'Regalia'
  AND b.category IN ('travel','insurance','rewards','dining','shopping') AND b.title_en IN (
   'Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers',
   'Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions',
   'Milestone & Bonus Points','Concierge & Assistance','Zomato / Swiggy & Food Delivery',
   'Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings'
)
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- HDFC Infinia (Infinite) – full benefit set
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER (ORDER BY b.priority DESC, b.title_en)
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id
CROSS JOIN benefits b
WHERE i.name = 'HDFC Bank' AND c.code = 'IN' AND cp.name = 'Infinia' AND b.is_active = true
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- HDFC MoneyBack+ (Platinum) – subset
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'HDFC Bank' AND c.code = 'IN' AND cp.name = 'MoneyBack+'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- SBI SimplyCLICK (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'SBI Card' AND c.code = 'IN' AND cp.name = 'SimplyCLICK'
  AND b.title_en IN ('Airport Lounge Access','Travel Insurance','Fuel Surcharge Waiver','Dining & Restaurant Offers','Online Shopping & Rewards','Purchase Protection','Extended Warranty','Reward Points & Redemptions','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Hotel & Travel Bookings')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- SBI SimplySAVE (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'SBI Card' AND c.code = 'IN' AND cp.name = 'SimplySAVE'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Flipkart / Amazon / Partner Offers')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- SBI BPCL Octane (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'SBI Card' AND c.code = 'IN' AND cp.name = 'BPCL Octane'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Airport Lounge Access','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- ICICI Amazon Pay (Signature)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'ICICI Bank' AND c.code = 'IN' AND cp.name = 'Amazon Pay'
  AND b.title_en IN ('Online Shopping & Rewards','Flipkart / Amazon / Partner Offers','Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;

-- ICICI Coral (Platinum)
INSERT INTO card_product_benefits (card_product_id, benefit_id, display_order)
SELECT cp.id, b.id, row_number() OVER ()
FROM card_products cp
JOIN issuers i ON i.id = cp.issuer_id
JOIN countries c ON c.id = i.country_id,
     benefits b
WHERE i.name = 'ICICI Bank' AND c.code = 'IN' AND cp.name = 'Coral'
  AND b.title_en IN ('Fuel Surcharge Waiver','Reward Points & Redemptions','Purchase Protection','Extended Warranty','Online Shopping & Rewards','Dining & Restaurant Offers','Zomato / Swiggy & Food Delivery','Flipkart / Amazon / Partner Offers','Airport Lounge Access','Travel Insurance')
ON CONFLICT (card_product_id, benefit_id) DO NOTHING;
