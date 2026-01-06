import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Shield, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { VisaCardVisual } from "@/components/cards/VisaCardVisual";
import { useApp } from "@/context/AppContext";

const Landing = () => {
  const { t } = useApp();

  const features = [
    {
      icon: Sparkles,
      title: t.landing.feature1Title,
      description: t.landing.feature1Desc,
    },
    {
      icon: Star,
      title: t.landing.feature2Title,
      description: t.landing.feature2Desc,
    },
    {
      icon: MapPin,
      title: t.landing.feature3Title,
      description: t.landing.feature3Desc,
    },
  ];

  const benefits = [
    "Airport Lounge Access",
    "Travel Insurance",
    "Dining Rewards",
    "Shopping Cashback",
    "Fuel Surcharge Waiver",
    "Concierge Services",
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">AI-Powered Assistant</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">{t.landing.heroTitle}</span>
                <br />
                <span className="text-gradient-gold">{t.landing.heroTitleHighlight}</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                {t.landing.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/25"
                >
                  <Link to="/card-input">
                    {t.landing.ctaButton}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-14 px-8 text-lg font-semibold"
                >
                  <Link to="/login">{t.landing.ctaSecondary}</Link>
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">No Data Storage</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Card Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <VisaCardVisual
                  cardNumber="4111111111111111"
                  holderName="JOHN DOE"
                  expiry="12/26"
                  className="animate-float"
                />
                
                {/* Floating Benefit Pills */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-card shadow-xl border border-border"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium">12 Benefits Active</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-card shadow-xl border border-border"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">₹15,000+ Savings</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered assistant analyzes your Visa card and reveals all the hidden benefits you're entitled to.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border p-8 hover-lift"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Benefits Like
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-5 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-foreground font-medium"
              >
                {benefit}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              asChild
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/25"
            >
              <Link to="/card-input">
                {t.landing.ctaButton}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-center"
          >
            <Shield className="w-6 h-6 text-muted-foreground" />
            <p className="text-muted-foreground">
              {t.landing.privacyNote}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
