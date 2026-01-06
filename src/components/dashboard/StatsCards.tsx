import { motion } from "framer-motion";
import { CreditCard, Gift, Sparkles, TrendingUp } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const StatsCards = () => {
  const { t, benefits, activatedBenefits } = useApp();

  const stats = [
    {
      label: t.dashboard.totalBenefits,
      value: benefits.length.toString(),
      icon: Gift,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: t.dashboard.activeOffers,
      value: benefits.filter((b) => b.expiresAt).length.toString(),
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      label: t.dashboard.potentialSavings,
      value: "₹12,500+",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Activated",
      value: activatedBenefits.size.toString(),
      icon: CreditCard,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border p-5 hover-lift"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
