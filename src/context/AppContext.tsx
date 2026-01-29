import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { translations, type TranslationType } from "@/i18n/translations";
import { type Benefit } from "@/data/benefits";
import { fetchBenefitsForCardProduct } from "@/lib/benefits-api";
import { supabase } from "@/integrations/supabase/client";

export interface SelectedCardProduct {
  id: string;
  name: string;
  issuerName: string;
  visaTier: string;
}

const STORAGE_KEY = "visa_selected_card";

function loadSelectedCardFromStorage(): SelectedCardProduct | null {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const p = JSON.parse(s) as unknown;
      if (p && typeof p === "object" && "id" in p && "name" in p) {
        return p as SelectedCardProduct;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

function mapSupabaseUser(su: { email?: string | null; user_metadata?: Record<string, unknown> } | null): User | null {
  if (!su?.email) return null;
  const meta = su.user_metadata || {};
  const name =
    (meta.full_name as string) || (meta.name as string) || su.email.split("@")[0] || "User";
  return {
    email: su.email,
    name,
    avatar: (meta.avatar_url as string) || undefined,
  };
}

interface User {
  email: string;
  name: string;
  avatar?: string;
}

interface Notification {
  id: string;
  type: "success" | "info" | "warning";
  message: string;
  timestamp: Date;
}

interface AppContextType {
  t: TranslationType;

  // Auth (Google OAuth only)
  user: User | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  authError: string | null;
  isAuthLoading: boolean;

  // Card (product selection – we never store card numbers)
  selectedCardProduct: SelectedCardProduct | null;
  setSelectedCardProduct: (p: SelectedCardProduct | null) => void;
  hasSelectedCard: boolean;
  isLoadingBenefits: boolean;

  // Benefits
  benefits: Benefit[];
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
  const t: TranslationType = translations.en;

  // Auth state (Google OAuth via Supabase)
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const isAuthenticated = user !== null;

  // Supabase auth: init session and listen for changes
  useEffect(() => {
    setAuthError(null);
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setIsAuthLoading(false);
      if (error) setAuthError(error.message);
      else setUser(mapSupabaseUser(session?.user ?? null));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapSupabaseUser(session?.user ?? null));
      setAuthError(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Card state (product only; no card numbers)
  const [selectedCardProduct, setSelectedCardProductState] = useState<SelectedCardProduct | null>(loadSelectedCardFromStorage);
  const hasSelectedCard = selectedCardProduct !== null;

  const setSelectedCardProduct = useCallback((p: SelectedCardProduct | null) => {
    setSelectedCardProductState(p);
    if (p) localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Benefits state (fetched from API when a card is selected)
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [isLoadingBenefits, setIsLoadingBenefits] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // AI state
  const [aiRecommendation, setAiRecommendation] = useState<Benefit | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Location (Bangalore for location-based AI and offers)
  const [userLocation] = useState("Bangalore, India");

  // Fetch benefits when a card product is selected (from DB only; Visa API not used)
  useEffect(() => {
    if (!selectedCardProduct?.id) {
      setBenefits([]);
      return;
    }
    let cancelled = false;
    setIsLoadingBenefits(true);
    fetchBenefitsForCardProduct(selectedCardProduct.id)
      .then((data) => {
        if (!cancelled) setBenefits(data);
      })
      .catch(() => { if (!cancelled) setBenefits([]); })
      .finally(() => { if (!cancelled) setIsLoadingBenefits(false); });
    return () => { cancelled = true; };
  }, [selectedCardProduct?.id]);

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

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/card-input` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setAuthError(error.message);
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSelectedCardProduct(null);
  }, [setSelectedCardProduct]);

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
  }, [benefits, userLocation]);

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
        t,
        user,
        isAuthenticated,
        signInWithGoogle,
        logout,
        authError,
        isAuthLoading,
        selectedCardProduct,
        setSelectedCardProduct,
        hasSelectedCard,
        isLoadingBenefits,
        benefits,
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
