import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, AlertCircle, CheckCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

export const NotificationBanner = () => {
  const { notifications, dismissNotification } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-accent" />;
      default:
        return <Bell className="w-4 h-4 text-primary" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-success/10 border-success/20";
      case "warning":
        return "bg-accent/10 border-accent/20";
      default:
        return "bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${getBgColor(notification.type)}`}
          >
            {getIcon(notification.type)}
            <p className="text-sm font-medium flex-1 text-foreground">
              {notification.message}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => dismissNotification(notification.id)}
            >
              <X className="w-3 h-3" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
