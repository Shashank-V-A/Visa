import { motion } from "framer-motion";
import {
  Plane,
  Utensils,
  ShoppingBag,
  Shield,
  Gift,
  LayoutGrid,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const categories = [
  { id: "all", icon: LayoutGrid },
  { id: "travel", icon: Plane },
  { id: "dining", icon: Utensils },
  { id: "shopping", icon: ShoppingBag },
  { id: "insurance", icon: Shield },
  { id: "rewards", icon: Gift },
];

export const CategoryTabs = () => {
  const { t, selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = selectedCategory === category.id;
        const label = t.categories[category.id as keyof typeof t.categories];

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-primary -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
