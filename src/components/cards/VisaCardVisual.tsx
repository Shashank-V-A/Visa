import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

interface VisaCardVisualProps {
  cardNumber?: string;
  holderName?: string;
  expiry?: string;
  className?: string;
}

export const VisaCardVisual = ({
  cardNumber = "4XXX XXXX XXXX XXXX",
  holderName = "CARD HOLDER",
  expiry = "MM/YY",
  className = "",
}: VisaCardVisualProps) => {
  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\s/g, "").padEnd(16, "X");
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)} ${cleaned.slice(12, 16)}`;
  };

  return (
    <motion.div
      className={`relative w-full max-w-[400px] aspect-[1.586/1] rounded-2xl overflow-hidden ${className}`}
      initial={{ rotateY: -10, rotateX: 5 }}
      animate={{ rotateY: 0, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-visa-blue-light" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 250">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />

      {/* Card Content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Top Row */}
        <div className="flex justify-between items-start">
          {/* Chip */}
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-md">
            <div className="w-full h-full grid grid-cols-3 gap-px p-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-yellow-600/30 rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* Contactless */}
          <Wifi className="w-8 h-8 text-white/70 rotate-90" />
        </div>

        {/* Card Number */}
        <div className="my-4">
          <p className="font-mono text-xl md:text-2xl tracking-[0.2em] text-white/90">
            {formatCardNumber(cardNumber)}
          </p>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Card Holder</p>
            <p className="text-sm font-medium text-white uppercase tracking-wider">
              {holderName}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Expires</p>
            <p className="text-sm font-medium text-white tracking-wider">
              {expiry}
            </p>
          </div>
          {/* Visa Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold italic text-white tracking-tighter">VISA</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
