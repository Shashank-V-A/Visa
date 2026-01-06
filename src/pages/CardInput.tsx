import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { CardInputForm } from "@/components/cards/CardInputForm";
import { useApp } from "@/context/AppContext";

const CardInput = () => {
  const { t } = useApp();

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.cardInput.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.cardInput.subtitle}
            </p>
          </motion.div>

          <CardInputForm />
        </div>
      </div>
    </Layout>
  );
};

export default CardInput;
