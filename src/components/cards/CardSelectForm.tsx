import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VisaCardVisual } from "./VisaCardVisual";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import {
  fetchCountries,
  fetchIssuers,
  fetchCardProducts,
  type Country,
  type Issuer,
  type CardProduct,
} from "@/lib/benefits-api";

export const CardSelectForm = () => {
  const { t, setSelectedCardProduct } = useApp();
  const navigate = useNavigate();

  const [countries, setCountries] = useState<Country[]>([]);
  const [issuers, setIssuers] = useState<Issuer[]>([]);
  const [cardProducts, setCardProducts] = useState<CardProduct[]>([]);

  const [countryCode, setCountryCode] = useState<string>("IN");
  const [issuerId, setIssuerId] = useState<string>("");
  const [cardProductId, setCardProductId] = useState<string>("");

  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [isLoadingIssuers, setIsLoadingIssuers] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load countries on mount
  useEffect(() => {
    let cancelled = false;
    setIsLoadingCountries(true);
    setError(null);
    fetchCountries()
      .then((data) => {
        if (!cancelled) setCountries(data);
        if (!cancelled && data.length > 0 && !data.some((c) => c.code === "IN")) {
          setCountryCode(data[0]?.code ?? "IN");
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || t.common.error);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCountries(false);
      });
    return () => { cancelled = true; };
  }, [t.common.error]);

  // When country changes: fetch issuers, clear issuer & card
  useEffect(() => {
    setIssuerId("");
    setCardProductId("");
    setCardProducts([]);
    if (!countryCode) {
      setIssuers([]);
      return;
    }
    let cancelled = false;
    setIsLoadingIssuers(true);
    fetchIssuers(countryCode)
      .then((data) => { if (!cancelled) setIssuers(data); })
      .catch((e) => { if (!cancelled) setError(e?.message || t.common.error); })
      .finally(() => { if (!cancelled) setIsLoadingIssuers(false); });
    return () => { cancelled = true; };
  }, [countryCode, t.common.error]);

  // When issuer changes: fetch card products, clear card
  useEffect(() => {
    setCardProductId("");
    if (!issuerId) {
      setCardProducts([]);
      return;
    }
    let cancelled = false;
    setIsLoadingCards(true);
    fetchCardProducts(issuerId)
      .then((data) => { if (!cancelled) setCardProducts(data); })
      .catch((e) => { if (!cancelled) setError(e?.message || t.common.error); })
      .finally(() => { if (!cancelled) setIsLoadingCards(false); });
    return () => { cancelled = true; };
  }, [issuerId, t.common.error]);

  const selectedIssuer = issuers.find((i) => i.id === issuerId) ?? null;
  const selectedCard = cardProducts.find((c) => c.id === cardProductId) ?? null;
  const canSubmit = !!selectedCard;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !selectedCard) return;
    setIsSubmitting(true);
    setError(null);
    try {
      setSelectedCardProduct({
        id: selectedCard.id,
        name: selectedCard.name,
        issuerName: selectedCard.issuer?.name ?? selectedIssuer?.name ?? "",
        visaTier: selectedCard.visa_tier,
      });
      navigate("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : t.common.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardLabel = selectedCard
    ? [selectedIssuer?.name, selectedCard.name].filter(Boolean).join(" • ")
    : "Visa";

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
          cardProductName={cardLabel}
          issuerName={selectedIssuer?.name}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Country */}
        <div className="space-y-2">
          <Label>{t.cardInput.country}</Label>
          <Select
            value={countryCode}
            onValueChange={setCountryCode}
            disabled={isLoadingCountries}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder={t.cardInput.selectCountry} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c.id} value={c.code}>
                  {c.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingCountries && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.common.loading}
            </p>
          )}
        </div>

        {/* Issuer (Bank) */}
        <div className="space-y-2">
          <Label>{t.cardInput.issuer}</Label>
          <Select
            value={issuerId || "__none__"}
            onValueChange={(v) => setIssuerId(v === "__none__" ? "" : v)}
            disabled={isLoadingIssuers || !countryCode}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder={t.cardInput.selectIssuer} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">{t.cardInput.selectIssuer}</SelectItem>
              {issuers.map((i) => (
                <SelectItem key={i.id} value={i.id}>
                  {i.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingIssuers && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.common.loading}
            </p>
          )}
        </div>

        {/* Card Product */}
        <div className="space-y-2">
          <Label>{t.cardInput.cardProduct}</Label>
          <Select
            value={cardProductId || "__none__"}
            onValueChange={(v) => setCardProductId(v === "__none__" ? "" : v)}
            disabled={isLoadingCards || !issuerId}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder={t.cardInput.selectCard} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">{t.cardInput.selectCard}</SelectItem>
              {cardProducts.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} {c.visa_tier ? `(${c.visa_tier})` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingCards && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.common.loading}
            </p>
          )}
        </div>

        {/* Privacy */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
          <Lock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            {t.cardInput.privacyDisclaimer}
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/25"
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {t.cardInput.submitButton}
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};
