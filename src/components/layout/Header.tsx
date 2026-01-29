import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export const Header = () => {
  const { t, isAuthenticated, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/dashboard", label: t.nav.dashboard, protected: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-foreground">Visa</span>
              <span className="font-medium text-muted-foreground ml-1">Benefits</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.protected && !isAuthenticated) return null;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t.nav.login}</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:opacity-90">
                  <Link to="/signup">{t.nav.signup}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                if (link.protected && !isAuthenticated) return null;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{user?.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t.nav.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        {t.nav.login}
                      </Link>
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-accent to-accent/90 text-accent-foreground" asChild>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                        {t.nav.signup}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
