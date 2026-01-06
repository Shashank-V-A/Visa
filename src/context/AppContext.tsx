import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Language, type TranslationType } from "@/i18n/translations";
import { type Benefit, mockBenefits } from "@/data/benefits";

interface User {
  email: string;
  name: string;
  cardLast4: string;
}

interface Notification {
  id: string;
  type: "success" | "info" | "warning";
  message: string;
  timestamp: Date;
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;

  // Card
  cardNumber: string;
  setCardNumber: (card: string) => void;
  isCardValid: boolean;
  hasEnteredCard: boolean;

  // Benefits
  benefits: Benefit[];
  activatedBenefits: Set<string>;
  activateBenefit: (id: string) => void;
  filteredBenefits: Benefit[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // AI
  aiRecommendation: Benefit | null;
  aiSummary: string;
  isLoadingAI: boolean;
  fetchAIRecommendation: () => Promise<void>;

  // Notifications
  notifications: Notification[];
  addNotification: (type: Notification["type"], message: string) => void;
  dismissNotification: (id: string) => void;

  // Location
  userLocation: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language state
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  // Card state
  const [cardNumber, setCardNumberState] = useState("");
  const [hasEnteredCard, setHasEnteredCard] = useState(false);

  // Benefits state
  const [benefits] = useState<Benefit[]>(mockBenefits);
  const [activatedBenefits, setActivatedBenefits] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // AI state
  const [aiRecommendation, setAiRecommendation] = useState<Benefit | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Location state (mocked)
  const [userLocation] = useState("Chennai, India");

  // Validate Visa card number (starts with 4, 16 digits)
  const isCardValid = /^4\d{15}$/.test(cardNumber.replace(/\s/g, ""));

  const setCardNumber = useCallback((card: string) => {
    setCardNumberState(card);
    if (card.replace(/\s/g, "").length === 16) {
      setHasEnteredCard(true);
    }
  }, []);

  // Filter benefits based on category and search
  const filteredBenefits = benefits.filter((benefit) => {
    const matchesCategory = selectedCategory === "all" || benefit.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      benefit.title.toLowerCase().includes(searchLower) ||
      benefit.description.toLowerCase().includes(searchLower) ||
      benefit.category.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // Auth functions
  const login = useCallback(async (email: string, _password: string) => {
    // Simulated login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      email,
      name: email.split("@")[0],
      cardLast4: "4567",
    });
  }, []);

  const signup = useCallback(async (email: string, _password: string, name: string) => {
    // Simulated signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      email,
      name,
      cardLast4: "4567",
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCardNumberState("");
    setHasEnteredCard(false);
    setActivatedBenefits(new Set());
  }, []);

  // Activate benefit
  const activateBenefit = useCallback((id: string) => {
    setActivatedBenefits((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    addNotification("success", t.notifications.benefitActivated);
  }, [t]);

  // Fetch AI recommendation
  const fetchAIRecommendation = useCallback(async () => {
    setIsLoadingAI(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-benefits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          benefits: benefits.slice(0, 5),
          location: userLocation,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI recommendation");
      }

      const data = await response.json();
      
      if (data.recommendedBenefitId) {
        const recommended = benefits.find((b) => b.id === data.recommendedBenefitId);
        if (recommended) {
          setAiRecommendation(recommended);
        }
      } else {
        // Fallback to highest priority benefit
        const sorted = [...benefits].sort((a, b) => b.priority - a.priority);
        setAiRecommendation(sorted[0]);
      }
      
      setAiSummary(data.summary || "Based on your location and card type, this benefit offers the best value for you right now.");
    } catch (error) {
      console.error("AI recommendation error:", error);
      // Fallback to highest priority benefit
      const sorted = [...benefits].sort((a, b) => b.priority - a.priority);
      setAiRecommendation(sorted[0]);
      setAiSummary("Based on your card type, this benefit offers the best value for you right now.");
    } finally {
      setIsLoadingAI(false);
    }
  }, [benefits, userLocation, language]);

  // Notifications
  const addNotification = useCallback((type: Notification["type"], message: string) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, type, message, timestamp: new Date() }]);
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        cardNumber,
        setCardNumber,
        isCardValid,
        hasEnteredCard,
        benefits,
        activatedBenefits,
        activateBenefit,
        filteredBenefits,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        aiRecommendation,
        aiSummary,
        isLoadingAI,
        fetchAIRecommendation,
        notifications,
        addNotification,
        dismissNotification,
        userLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
