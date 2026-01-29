export type Language = "en";

export interface TranslationType {
  nav: {
    home: string;
    dashboard: string;
    benefits: string;
    login: string;
    signup: string;
    logout: string;
  };
  landing: {
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    ctaButton: string;
    ctaSecondary: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    trustedBy: string;
    privacyNote: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signupTitle: string;
    signupSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    loginButton: string;
    signupButton: string;
    noAccount: string;
    hasAccount: string;
    orContinue: string;
    signInWithGoogle: string;
    signUpWithGoogle: string;
  };
  cardInput: {
    title: string;
    subtitle: string;
    country: string;
    selectCountry: string;
    issuer: string;
    selectIssuer: string;
    cardProduct: string;
    selectCard: string;
    cardNumber: string;
    cardPlaceholder: string;
    expiryLabel: string;
    expiryPlaceholder: string;
    submitButton: string;
    privacyDisclaimer: string;
    validCard: string;
    invalidCard: string;
    noCardHint: string;
  };
  dashboard: {
    welcomeBack: string;
    yourCard: string;
    totalBenefits: string;
    activeOffers: string;
    potentialSavings: string;
    aiRecommendation: string;
    bestBenefitTitle: string;
    viewAll: string;
    changeCard: string;
    learnMore: string;
    expires: string;
    terms: string;
  };
  categories: {
    all: string;
    travel: string;
    dining: string;
    shopping: string;
    insurance: string;
    rewards: string;
  };
  search: {
    placeholder: string;
    noResults: string;
    tryDifferent: string;
  };
  notifications: {
    newOffer: string;
    expiringOffer: string;
    benefitActivated: string;
  };
  footer: {
    contact: string;
    disclaimer: string;
    awareness: string;
    copyright: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    back: string;
    next: string;
    save: string;
    cancel: string;
    close: string;
  };
}

export const translations: Record<Language, TranslationType> = {
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
      signInWithGoogle: "Sign in with Google",
      signUpWithGoogle: "Sign up with Google",
    },
    // Card Input
    cardInput: {
      title: "Select Your Visa Card",
      subtitle: "Choose your bank and card to see your actual benefits",
      country: "Country",
      selectCountry: "Select country",
      issuer: "Issuing Bank",
      selectIssuer: "Select your bank",
      cardProduct: "Card",
      selectCard: "Select your card",
      cardNumber: "Card Number",
      cardPlaceholder: "4XXX XXXX XXXX XXXX",
      expiryLabel: "Valid Thru",
      expiryPlaceholder: "MM/YY",
      submitButton: "View My Benefits",
      privacyDisclaimer: "We never ask for or store your card number. Benefits are shown based on your card type only.",
      validCard: "Valid Visa card detected",
      invalidCard: "Please enter a valid Visa card number",
      noCardHint: "Don't have a card? Pick any card below to explore its benefits.",
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
      changeCard: "Change card",
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
      contact: "Contact",
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
};
