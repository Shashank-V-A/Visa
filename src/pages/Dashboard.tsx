import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CategoryTabs } from "@/components/dashboard/CategoryTabs";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { BenefitsGrid } from "@/components/dashboard/BenefitsGrid";
import { AIRecommendationCard } from "@/components/ai/AIRecommendationCard";
import { VisaCardVisual } from "@/components/cards/VisaCardVisual";
import { useApp } from "@/context/AppContext";

const Dashboard = () => {
  const { t, user, hasSelectedCard, selectedCardProduct } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasSelectedCard) navigate("/card-input", { replace: true });
  }, [hasSelectedCard, navigate]);

  if (!hasSelectedCard || !selectedCardProduct) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t.dashboard.welcomeBack}, {user?.name || "User"} 👋
          </h1>
          <p className="text-muted-foreground">
            Explore your Visa card benefits
          </p>
        </motion.div>

        {/* Top Section: Card + AI Recommendation */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Card Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-foreground">
                {t.dashboard.yourCard}
              </h2>
              <Link
                to="/card-input"
                className="text-sm text-primary hover:underline"
              >
                {t.dashboard.changeCard}
              </Link>
            </div>
            <div className="flex justify-center">
              <VisaCardVisual
                cardProductName={selectedCardProduct.name}
                issuerName={selectedCardProduct.issuerName}
              />
            </div>
          </motion.div>

          {/* AI Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AIRecommendationCard />
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <StatsCards />
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-foreground">
              {t.dashboard.viewAll}
            </h2>
            <div className="w-full md:w-80">
              <SearchBar />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-6">
            <CategoryTabs />
          </div>

          {/* Benefits Grid */}
          <BenefitsGrid />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
