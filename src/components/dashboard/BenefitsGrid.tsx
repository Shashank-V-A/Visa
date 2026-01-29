import { motion, AnimatePresence } from "framer-motion";
import { SearchX, Loader2 } from "lucide-react";
import { BenefitCard } from "@/components/cards/BenefitCard";
import { useApp } from "@/context/AppContext";

export const BenefitsGrid = () => {
  const { t, filteredBenefits, searchQuery, isLoadingBenefits } = useApp();

  if (isLoadingBenefits) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">{t.common.loading}</p>
      </div>
    );
  }

  if (filteredBenefits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="p-4 rounded-full bg-muted mb-4">
          <SearchX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.search.noResults}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery ? t.search.tryDifferent : ""}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredBenefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </AnimatePresence>
    </div>
  );
};
