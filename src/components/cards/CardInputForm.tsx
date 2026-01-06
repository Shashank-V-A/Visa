import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, Check, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VisaCardVisual } from "./VisaCardVisual";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

export const CardInputForm = () => {
  const { t, cardNumber, setCardNumber, isCardValid } = useApp();
  const [expiry, setExpiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value.replace("/", ""));
    setExpiry(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCardValid) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const maskedNumber = cardNumber.replace(/\d(?=\d{4})/g, "•");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Card Visual */}
      <div className="flex justify-center mb-8">
        <VisaCardVisual
          cardNumber={cardNumber || "4XXX XXXX XXXX XXXX"}
          expiry={expiry || "MM/YY"}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            {t.cardInput.cardNumber}
          </Label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              placeholder={t.cardInput.cardPlaceholder}
              value={cardNumber}
              onChange={handleCardChange}
              className={`h-12 text-lg font-mono pr-12 ${
                cardNumber.length >= 4
                  ? isCardValid
                    ? "border-success focus-visible:ring-success"
                    : cardNumber.replace(/\s/g, "").length === 16
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                  : ""
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {cardNumber.replace(/\s/g, "").length >= 16 && (
                isCardValid ? (
                  <Check className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )
              )}
            </div>
          </div>
          {cardNumber.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm ${isCardValid ? "text-success" : "text-muted-foreground"}`}
            >
              {cardNumber[0] === "4"
                ? isCardValid
                  ? t.cardInput.validCard
                  : cardNumber.replace(/\s/g, "").length === 16
                  ? t.cardInput.invalidCard
                  : ""
                : t.cardInput.invalidCard}
            </motion.p>
          )}
        </div>

        {/* Expiry */}
        <div className="space-y-2">
          <Label htmlFor="expiry">{t.cardInput.expiryLabel}</Label>
          <Input
            id="expiry"
            type="text"
            inputMode="numeric"
            placeholder={t.cardInput.expiryPlaceholder}
            value={expiry}
            onChange={handleExpiryChange}
            className="h-12 text-lg font-mono max-w-[120px]"
          />
        </div>

        {/* Privacy Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <Lock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            {t.cardInput.privacyDisclaimer}
          </p>
        </motion.div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/25"
          disabled={!isCardValid || isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
            />
          ) : (
            <>
              {t.cardInput.submitButton}
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Test Card Hint */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Try test card: <span className="font-mono">4111 1111 1111 1111</span>
      </p>
    </motion.div>
  );
};
