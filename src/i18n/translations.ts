export type Language = "en" | "ta";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      benefits: "Benefits",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
    },
    // Landing Page
    landing: {
      heroTitle: "Unlock Your Visa Card's",
      heroTitleHighlight: "Hidden Benefits",
      heroSubtitle: "Discover travel perks, dining discounts, shopping rewards, and insurance coverage you never knew you had. Our AI-powered assistant helps you maximize every swipe.",
      ctaButton: "Discover My Card Benefits",
      ctaSecondary: "Learn More",
      feature1Title: "Smart Discovery",
      feature1Desc: "AI-powered analysis reveals benefits you're missing out on",
      feature2Title: "Personalized Tips",
      feature2Desc: "Get recommendations tailored to your spending habits",
      feature3Title: "Location Aware",
      feature3Desc: "Find nearby merchants where your benefits apply",
      trustedBy: "Trusted by cardholders worldwide",
      privacyNote: "Your card data is never stored. We only display benefits for awareness.",
    },
    // Auth
    auth: {
      loginTitle: "Welcome Back",
      loginSubtitle: "Sign in to access your personalized benefits",
      signupTitle: "Get Started",
      signupSubtitle: "Create an account to discover your card benefits",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+91 98765 43210",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      loginButton: "Sign In",
      signupButton: "Create Account",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      orContinue: "Or continue with",
    },
    // Card Input
    cardInput: {
      title: "Enter Your Card Details",
      subtitle: "We'll match your card to available Visa benefits",
      cardNumber: "Card Number",
      cardPlaceholder: "4XXX XXXX XXXX XXXX",
      expiryLabel: "Valid Thru",
      expiryPlaceholder: "MM/YY",
      submitButton: "Discover My Benefits",
      privacyDisclaimer: "🔒 Your card number is masked and never stored. This is for demonstration purposes only.",
      validCard: "Valid Visa card detected",
      invalidCard: "Please enter a valid Visa card number",
    },
    // Dashboard
    dashboard: {
      welcomeBack: "Welcome back",
      yourCard: "Your Card",
      totalBenefits: "Total Benefits",
      activeOffers: "Active Offers",
      potentialSavings: "Potential Savings",
      aiRecommendation: "AI Recommendation",
      bestBenefitTitle: "Best Benefit for You Right Now",
      viewAll: "View All Benefits",
      activate: "Activate",
      activated: "Activated",
      learnMore: "Learn More",
      expires: "Expires",
      terms: "Terms & Conditions",
    },
    // Categories
    categories: {
      all: "All Benefits",
      travel: "Travel",
      dining: "Dining",
      shopping: "Shopping",
      insurance: "Insurance",
      rewards: "Rewards",
    },
    // Search
    search: {
      placeholder: "Search benefits...",
      noResults: "No benefits found",
      tryDifferent: "Try a different search term",
    },
    // Notifications
    notifications: {
      newOffer: "New Offer Available!",
      expiringOffer: "Offer Expiring Soon",
      benefitActivated: "Benefit Activated Successfully",
    },
    // Footer
    footer: {
      privacyPolicy: "Privacy Policy",
      terms: "Terms of Service",
      disclaimer: "This is a demonstration app. No actual card transactions are processed.",
      awareness: "For educational and awareness purposes only.",
      copyright: "© 2024 Visa Benefits Assistant. All rights reserved.",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Try Again",
      back: "Back",
      next: "Next",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
    },
  },
  ta: {
    // Navigation
    nav: {
      home: "முகப்பு",
      dashboard: "டாஷ்போர்டு",
      benefits: "நன்மைகள்",
      login: "உள்நுழைய",
      signup: "பதிவு செய்ய",
      logout: "வெளியேறு",
    },
    // Landing Page
    landing: {
      heroTitle: "உங்கள் விசா கார்டின்",
      heroTitleHighlight: "மறைந்த நன்மைகளைக் கண்டறியுங்கள்",
      heroSubtitle: "பயண சலுகைகள், உணவு தள்ளுபடிகள், ஷாப்பிங் வெகுமதிகள் மற்றும் காப்பீட்டு கவரேஜை கண்டறியுங்கள். எங்கள் AI உதவியாளர் உங்களுக்கு உதவுகிறது.",
      ctaButton: "என் கார்டு நன்மைகளைக் காண்க",
      ctaSecondary: "மேலும் அறிக",
      feature1Title: "புத்திசாலி கண்டுபிடிப்பு",
      feature1Desc: "AI இயங்கும் பகுப்பாய்வு உங்களுக்கு தவறவிட்ட நன்மைகளை வெளிப்படுத்துகிறது",
      feature2Title: "தனிப்பயன் குறிப்புகள்",
      feature2Desc: "உங்கள் செலவு பழக்கங்களுக்கு ஏற்ற பரிந்துரைகளைப் பெறுங்கள்",
      feature3Title: "இடம் அறிந்த",
      feature3Desc: "உங்கள் நன்மைகள் பொருந்தும் அருகிலுள்ள வணிகர்களைக் கண்டறியுங்கள்",
      trustedBy: "உலகெங்கிலும் உள்ள கார்டு வைத்திருப்பவர்களால் நம்பப்படுகிறது",
      privacyNote: "உங்கள் கார்டு தரவு சேமிக்கப்படாது. நன்மைகளை விழிப்புணர்வுக்காக மட்டுமே காட்டுகிறோம்.",
    },
    // Auth
    auth: {
      loginTitle: "மீண்டும் வரவேற்கிறோம்",
      loginSubtitle: "உங்கள் தனிப்பயன் நன்மைகளை அணுக உள்நுழையவும்",
      signupTitle: "தொடங்குங்கள்",
      signupSubtitle: "உங்கள் கார்டு நன்மைகளைக் கண்டறிய ஒரு கணக்கை உருவாக்கவும்",
      emailLabel: "மின்னஞ்சல் முகவரி",
      emailPlaceholder: "you@example.com",
      phoneLabel: "தொலைபேசி எண்",
      phonePlaceholder: "+91 98765 43210",
      passwordLabel: "கடவுச்சொல்",
      passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
      loginButton: "உள்நுழையவும்",
      signupButton: "கணக்கை உருவாக்கு",
      noAccount: "கணக்கு இல்லையா?",
      hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
      orContinue: "அல்லது தொடரவும்",
    },
    // Card Input
    cardInput: {
      title: "உங்கள் கார்டு விவரங்களை உள்ளிடவும்",
      subtitle: "கிடைக்கும் விசா நன்மைகளுடன் உங்கள் கார்டைப் பொருத்துவோம்",
      cardNumber: "கார்டு எண்",
      cardPlaceholder: "4XXX XXXX XXXX XXXX",
      expiryLabel: "செல்லுபடியாகும்",
      expiryPlaceholder: "MM/YY",
      submitButton: "என் நன்மைகளைக் கண்டறி",
      privacyDisclaimer: "🔒 உங்கள் கார்டு எண் மறைக்கப்பட்டு சேமிக்கப்படாது. இது செய்முறை நோக்கங்களுக்காக மட்டுமே.",
      validCard: "செல்லுபடியாகும் விசா கார்டு கண்டறியப்பட்டது",
      invalidCard: "செல்லுபடியாகும் விசா கார்டு எண்ணை உள்ளிடவும்",
    },
    // Dashboard
    dashboard: {
      welcomeBack: "மீண்டும் வரவேற்கிறோம்",
      yourCard: "உங்கள் கார்டு",
      totalBenefits: "மொத்த நன்மைகள்",
      activeOffers: "செயலில் உள்ள சலுகைகள்",
      potentialSavings: "சாத்தியமான சேமிப்பு",
      aiRecommendation: "AI பரிந்துரை",
      bestBenefitTitle: "இப்போது உங்களுக்கான சிறந்த நன்மை",
      viewAll: "அனைத்து நன்மைகளையும் காண்க",
      activate: "செயல்படுத்து",
      activated: "செயல்படுத்தப்பட்டது",
      learnMore: "மேலும் அறிக",
      expires: "காலாவதியாகும்",
      terms: "விதிமுறைகள்",
    },
    // Categories
    categories: {
      all: "அனைத்து நன்மைகள்",
      travel: "பயணம்",
      dining: "உணவகம்",
      shopping: "ஷாப்பிங்",
      insurance: "காப்பீடு",
      rewards: "வெகுமதிகள்",
    },
    // Search
    search: {
      placeholder: "நன்மைகளைத் தேடு...",
      noResults: "நன்மைகள் எதுவும் கிடைக்கவில்லை",
      tryDifferent: "வேறு தேடல் சொல்லை முயற்சிக்கவும்",
    },
    // Notifications
    notifications: {
      newOffer: "புதிய சலுகை கிடைக்கிறது!",
      expiringOffer: "சலுகை விரைவில் காலாவதியாகிறது",
      benefitActivated: "நன்மை வெற்றிகரமாக செயல்படுத்தப்பட்டது",
    },
    // Footer
    footer: {
      privacyPolicy: "தனியுரிமை கொள்கை",
      terms: "சேவை விதிமுறைகள்",
      disclaimer: "இது ஒரு செய்முறை பயன்பாடு. உண்மையான கார்டு பரிவர்த்தனைகள் செயலாக்கப்படவில்லை.",
      awareness: "கல்வி மற்றும் விழிப்புணர்வு நோக்கங்களுக்காக மட்டுமே.",
      copyright: "© 2024 விசா நன்மைகள் உதவியாளர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
    // Common
    common: {
      loading: "ஏற்றுகிறது...",
      error: "ஏதோ தவறு நடந்தது",
      retry: "மீண்டும் முயற்சிக்கவும்",
      back: "பின்செல்",
      next: "அடுத்து",
      save: "சேமி",
      cancel: "ரத்து செய்",
      close: "மூடு",
    },
  },
} as const;
