export type BenefitCategory = "travel" | "dining" | "shopping" | "insurance" | "rewards";

export interface Benefit {
  id: string;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  category: BenefitCategory;
  icon: string;
  value: string;
  valueTa: string;
  termsUrl: string;
  expiresAt?: string;
  isActive: boolean;
  merchants?: string[];
  locationRestriction?: string;
  aiSummary?: string;
  aiSummaryTa?: string;
  priority: number;
}

export const mockBenefits: Benefit[] = [
  {
    id: "1",
    title: "Airport Lounge Access",
    titleTa: "விமான நிலைய லவுஞ்ச் அணுகல்",
    description: "Complimentary access to over 1,000 airport lounges worldwide with Priority Pass membership included.",
    descriptionTa: "உலகளவில் 1,000+ விமான நிலைய லவுஞ்ச்களுக்கு இலவச அணுகல் பிரயாரிட்டி பாஸ் உறுப்பினர்.",
    category: "travel",
    icon: "Plane",
    value: "Unlimited visits",
    valueTa: "வரம்பற்ற வருகைகள்",
    termsUrl: "/terms/lounge-access",
    expiresAt: "2025-12-31",
    isActive: true,
    merchants: ["Priority Pass Lounges", "Plaza Premium", "DragonPass"],
    priority: 95,
  },
  {
    id: "2",
    title: "Travel Insurance Coverage",
    titleTa: "பயண காப்பீடு",
    description: "Up to ₹50 lakhs coverage for trip cancellation, medical emergencies, and lost baggage when you pay with your card.",
    descriptionTa: "கார்டு மூலம் செலுத்தும்போது பயண ரத்து, மருத்துவ அவசரநிலை, மற்றும் தொலைந்த சாமான்களுக்கு ₹50 லட்சம் வரை கவரேஜ்.",
    category: "insurance",
    icon: "Shield",
    value: "₹50 Lakhs",
    valueTa: "₹50 லட்சம்",
    termsUrl: "/terms/travel-insurance",
    isActive: true,
    priority: 90,
  },
  {
    id: "3",
    title: "Dining Privileges",
    titleTa: "உணவக சலுகைகள்",
    description: "Get up to 20% discount at 500+ premium restaurants across India. Valid on minimum bill of ₹1,500.",
    descriptionTa: "இந்தியா முழுவதும் 500+ பிரீமியம் உணவகங்களில் 20% வரை தள்ளுபடி. குறைந்தபட்ச பில் ₹1,500.",
    category: "dining",
    icon: "Utensils",
    value: "Up to 20% off",
    valueTa: "20% வரை தள்ளுபடி",
    termsUrl: "/terms/dining",
    expiresAt: "2025-06-30",
    isActive: true,
    merchants: ["Taj Hotels", "ITC Hotels", "Marriott", "The Leela"],
    locationRestriction: "India",
    priority: 85,
  },
  {
    id: "4",
    title: "Amazon Shopping Rewards",
    titleTa: "அமேசான் ஷாப்பிங் வெகுமதிகள்",
    description: "Earn 5X reward points on Amazon purchases. Get instant discount of ₹500 on orders above ₹5,000.",
    descriptionTa: "அமேசான் வாங்குதல்களில் 5X வெகுமதி புள்ளிகள். ₹5,000+ ஆர்டர்களில் ₹500 உடனடி தள்ளுபடி.",
    category: "shopping",
    icon: "ShoppingBag",
    value: "5X Points + ₹500 off",
    valueTa: "5X புள்ளிகள் + ₹500 தள்ளுபடி",
    termsUrl: "/terms/amazon-rewards",
    expiresAt: "2025-03-31",
    isActive: true,
    merchants: ["Amazon"],
    priority: 88,
  },
  {
    id: "5",
    title: "Fuel Surcharge Waiver",
    titleTa: "எரிபொருள் கட்டண விலக்கு",
    description: "1% fuel surcharge waiver at all petrol pumps across India. Minimum transaction ₹400, maximum benefit ₹250/month.",
    descriptionTa: "இந்தியா முழுவதும் அனைத்து பெட்ரோல் பம்புகளிலும் 1% எரிபொருள் கட்டண விலக்கு. குறைந்தபட்சம் ₹400, அதிகபட்ச நன்மை ₹250/மாதம்.",
    category: "rewards",
    icon: "Fuel",
    value: "1% waiver",
    valueTa: "1% விலக்கு",
    termsUrl: "/terms/fuel-waiver",
    isActive: true,
    priority: 75,
  },
  {
    id: "6",
    title: "Hotel Booking Discount",
    titleTa: "ஹோட்டல் புக்கிங் தள்ளுபடி",
    description: "Flat 15% discount on hotel bookings via partner portals. Additional room upgrade at select 5-star properties.",
    descriptionTa: "பங்குதாரர் போர்டல்கள் வழியாக ஹோட்டல் புக்கிங்களில் 15% தள்ளுபடி. தேர்ந்தெடுக்கப்பட்ட 5-நட்சத்திர ஹோட்டல்களில் அறை மேம்படுத்தல்.",
    category: "travel",
    icon: "Hotel",
    value: "15% off + Upgrade",
    valueTa: "15% தள்ளுபடி + மேம்படுத்தல்",
    termsUrl: "/terms/hotel-discount",
    expiresAt: "2025-09-30",
    isActive: true,
    merchants: ["MakeMyTrip", "Booking.com", "Agoda"],
    priority: 82,
  },
  {
    id: "7",
    title: "Purchase Protection",
    titleTa: "வாங்குதல் பாதுகாப்பு",
    description: "90-day purchase protection against theft or damage for items bought with your card. Coverage up to ₹1 lakh per item.",
    descriptionTa: "கார்டு மூலம் வாங்கிய பொருட்களுக்கு 90 நாள் திருட்டு அல்லது சேத பாதுகாப்பு. ஒரு பொருளுக்கு ₹1 லட்சம் வரை கவரேஜ்.",
    category: "insurance",
    icon: "ShieldCheck",
    value: "₹1 Lakh/item",
    valueTa: "₹1 லட்சம்/பொருள்",
    termsUrl: "/terms/purchase-protection",
    isActive: true,
    priority: 70,
  },
  {
    id: "8",
    title: "Zomato Gold Membership",
    titleTa: "ஸோமாட்டோ கோல்ட் உறுப்பினர்",
    description: "Complimentary 3-month Zomato Gold membership. Enjoy 1+1 on food orders and unlimited free delivery.",
    descriptionTa: "3 மாத ஸோமாட்டோ கோல்ட் உறுப்பினர் இலவசம். உணவு ஆர்டர்களில் 1+1 மற்றும் வரம்பற்ற இலவச டெலிவரி.",
    category: "dining",
    icon: "Pizza",
    value: "3 Months Free",
    valueTa: "3 மாதம் இலவசம்",
    termsUrl: "/terms/zomato-gold",
    expiresAt: "2025-04-15",
    isActive: true,
    merchants: ["Zomato"],
    priority: 80,
  },
  {
    id: "9",
    title: "Flipkart SuperCoins",
    titleTa: "ஃப்ளிப்கார்ட் சூப்பர்காயின்ஸ்",
    description: "Earn 10 SuperCoins per ₹100 spent on Flipkart. Use coins for exclusive deals and partner rewards.",
    descriptionTa: "ஃப்ளிப்கார்ட்டில் ஒவ்வொரு ₹100க்கும் 10 சூப்பர்காயின்ஸ். பிரத்யேக டீல்கள் மற்றும் பங்குதாரர் வெகுமதிகளுக்கு காயின்களைப் பயன்படுத்தவும்.",
    category: "shopping",
    icon: "Coins",
    value: "10 Coins/₹100",
    valueTa: "10 காயின்ஸ்/₹100",
    termsUrl: "/terms/flipkart-supercoins",
    isActive: true,
    merchants: ["Flipkart"],
    priority: 72,
  },
  {
    id: "10",
    title: "Milestone Rewards",
    titleTa: "மைல்ஸ்டோன் வெகுமதிகள்",
    description: "Earn bonus reward points on reaching quarterly spending milestones. ₹50,000 spend = 2,500 bonus points.",
    descriptionTa: "காலாண்டு செலவு மைல்ஸ்டோன்களை அடையும்போது போனஸ் வெகுமதி புள்ளிகள். ₹50,000 செலவு = 2,500 போனஸ் புள்ளிகள்.",
    category: "rewards",
    icon: "Trophy",
    value: "2,500 Bonus Points",
    valueTa: "2,500 போனஸ் புள்ளிகள்",
    termsUrl: "/terms/milestone-rewards",
    isActive: true,
    priority: 65,
  },
  {
    id: "11",
    title: "Concierge Services",
    titleTa: "கன்சியர்ஜ் சேவைகள்",
    description: "24/7 premium concierge service for travel bookings, restaurant reservations, and lifestyle requests.",
    descriptionTa: "பயண புக்கிங், உணவக முன்பதிவுகள், மற்றும் வாழ்க்கை முறை கோரிக்கைகளுக்கு 24/7 பிரீமியம் கன்சியர்ஜ் சேவை.",
    category: "travel",
    icon: "HeadphonesIcon",
    value: "24/7 Service",
    valueTa: "24/7 சேவை",
    termsUrl: "/terms/concierge",
    isActive: true,
    priority: 78,
  },
  {
    id: "12",
    title: "Extended Warranty",
    titleTa: "நீட்டிக்கப்பட்ட உத்தரவாதம்",
    description: "Double the manufacturer warranty up to 1 additional year on electronics purchased with your card.",
    descriptionTa: "கார்டு மூலம் வாங்கிய எலக்ட்ரானிக்ஸ் பொருட்களுக்கு 1 கூடுதல் ஆண்டு வரை உற்பத்தியாளர் உத்தரவாதத்தை இரட்டிப்பாக்கு.",
    category: "insurance",
    icon: "Clock",
    value: "+1 Year Warranty",
    valueTa: "+1 ஆண்டு உத்தரவாதம்",
    termsUrl: "/terms/extended-warranty",
    isActive: true,
    priority: 68,
  },
];

export const getCategoryIcon = (category: BenefitCategory): string => {
  const icons: Record<BenefitCategory, string> = {
    travel: "Plane",
    dining: "Utensils",
    shopping: "ShoppingBag",
    insurance: "Shield",
    rewards: "Gift",
  };
  return icons[category];
};

export const getCategoryColor = (category: BenefitCategory): string => {
  const colors: Record<BenefitCategory, string> = {
    travel: "text-blue-600 bg-blue-100",
    dining: "text-orange-600 bg-orange-100",
    shopping: "text-purple-600 bg-purple-100",
    insurance: "text-green-600 bg-green-100",
    rewards: "text-yellow-600 bg-yellow-100",
  };
  return colors[category];
};
