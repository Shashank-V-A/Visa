import { motion } from "framer-motion";
import { Sparkles, RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BenefitCard } from "@/components/cards/BenefitCard";
import { useApp } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

export const AIRecommendationCard = () => {
  const { t, aiRecommendation, aiSummary, isLoadingAI, fetchAIRecommendation, userLocation } = useApp();

  useEffect(() => {
    fetchAIRecommendation();
  }, [fetchAIRecommendation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-2xl border border-accent/20 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/25">
            <Sparkles className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">
              {t.dashboard.bestBenefitTitle}
            </h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{userLocation}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchAIRecommendation}
          disabled={isLoadingAI}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingAI ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* AI Summary */}
      {isLoadingAI ? (
        <div className="space-y-3 mb-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-muted-foreground mb-6 p-4 rounded-xl bg-background/50 border border-border/50"
        >
          <Sparkles className="w-4 h-4 inline-block mr-2 text-accent" />
          {aiSummary}
        </motion.p>
      )}

      {/* Recommended Benefit */}
      {isLoadingAI ? (
        <div className="bg-card rounded-2xl p-5 space-y-4">
          <div className="flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ) : aiRecommendation ? (
        <BenefitCard benefit={aiRecommendation} isRecommended />
      ) : null}
    </motion.div>
  );
};
