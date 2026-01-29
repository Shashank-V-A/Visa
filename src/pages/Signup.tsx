import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";

const Signup = () => {
  const { t, signInWithGoogle, authError, isAuthLoading, isAuthenticated } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) navigate("/card-input", { replace: true });
  }, [isAuthLoading, isAuthenticated, navigate]);

  if (isAuthLoading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border shadow-card p-8"
          >
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">{t.auth.signupTitle}</h1>
              <p className="text-muted-foreground">{t.auth.signupSubtitle}</p>
            </div>

            {authError && (
              <div className="mb-6 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                {authError}
              </div>
            )}

            <Button
              type="button"
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90"
              onClick={signInWithGoogle}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t.auth.signUpWithGoogle}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t.auth.hasAccount}{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                {t.nav.login}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
