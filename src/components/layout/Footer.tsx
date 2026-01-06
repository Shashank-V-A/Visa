import { CreditCard, Shield, Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const Footer = () => {
  const { t } = useApp();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="font-bold text-lg">Visa</span>
                <span className="font-medium text-primary-foreground/80 ml-1">Benefits</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-md">
              {t.footer.disclaimer}
            </p>
          </div>

          {/* Trust Signals */}
          <div>
            <h4 className="font-semibold mb-4">Security</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Shield className="w-4 h-4 text-accent" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Lock className="w-4 h-4 text-accent" />
                <span>No Data Storage</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                {t.footer.privacyPolicy}
              </a>
              <a href="#" className="block text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs text-primary-foreground/80">
                {t.footer.awareness}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
