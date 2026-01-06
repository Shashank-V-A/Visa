import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Utensils,
  ShoppingBag,
  Shield,
  Gift,
  ChevronDown,
  ExternalLink,
  Check,
  Clock,
  Hotel,
  Fuel,
  ShieldCheck,
  Pizza,
  Coins,
  Trophy,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Benefit } from "@/data/benefits";
import { useApp } from "@/context/AppContext";

interface BenefitCardProps {
  benefit: Benefit;
  isRecommended?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  ShoppingBag: <ShoppingBag className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Hotel: <Hotel className="w-5 h-5" />,
  Fuel: <Fuel className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Pizza: <Pizza className="w-5 h-5" />,
  Coins: <Coins className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  HeadphonesIcon: <Headphones className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  travel: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  dining: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  shopping: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  insurance: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rewards: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export const BenefitCard = ({ benefit, isRecommended = false }: BenefitCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language, activatedBenefits, activateBenefit } = useApp();
  const isActivated = activatedBenefits.has(benefit.id);

  const title = language === "ta" ? benefit.titleTa : benefit.title;
  const description = language === "ta" ? benefit.descriptionTa : benefit.description;
  const value = language === "ta" ? benefit.valueTa : benefit.value;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative bg-card rounded-2xl border shadow-card overflow-hidden hover-lift ${
        isRecommended ? "ring-2 ring-accent" : ""
      }`}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-xs font-semibold rounded-bl-xl">
          {t.dashboard.aiRecommendation}
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl ${categoryColors[benefit.category]}`}>
            {iconMap[benefit.icon] || <Gift className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              {t.categories[benefit.category as keyof typeof t.categories]}
            </Badge>
          </div>
        </div>

        {/* Value Highlight */}
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
          <p className="text-lg font-bold text-accent">{value}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border space-y-3">
                {/* Merchants */}
                {benefit.merchants && benefit.merchants.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Available at:</p>
                    <div className="flex flex-wrap gap-1">
                      {benefit.merchants.map((merchant) => (
                        <Badge key={merchant} variant="outline" className="text-xs">
                          {merchant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expiry */}
                {benefit.expiresAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {t.dashboard.expires}: {new Date(benefit.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Terms Link */}
                <a
                  href={benefit.termsUrl}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {t.dashboard.terms}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant={isActivated ? "secondary" : "default"}
            size="sm"
            className={`flex-1 ${
              !isActivated
                ? "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90"
                : ""
            }`}
            onClick={() => !isActivated && activateBenefit(benefit.id)}
            disabled={isActivated}
          >
            {isActivated ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                {t.dashboard.activated}
              </>
            ) : (
              t.dashboard.activate
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
