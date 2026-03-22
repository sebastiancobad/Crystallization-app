"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

type ToastVariant = "success" | "warning" | "error" | "info";

interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  title?: string;
}

interface ToastContextValue {
  toast: (variant: ToastVariant, message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const iconMap: Record<ToastVariant, typeof Info> = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const variantStyles: Record<ToastVariant, { bg: string; border: string; iconColor: string }> = {
  success: { bg: "bg-surface-0", border: "border-sage-200", iconColor: "text-sage-600" },
  warning: { bg: "bg-surface-0", border: "border-sand-200", iconColor: "text-sand-600" },
  error: { bg: "bg-surface-0", border: "border-rose-200", iconColor: "text-rose-600" },
  info: { bg: "bg-surface-0", border: "border-slate-200", iconColor: "text-slate-600" },
};

let counter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((variant: ToastVariant, message: string, title?: string) => {
    const id = `toast-${++counter}`;
    setToasts((prev) => [...prev, { id, variant, message, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[360px]" role="status" aria-live="polite" aria-atomic="false">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = iconMap[t.variant];
            const styles = variantStyles[t.variant];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
                  styles.bg,
                  styles.border,
                )}
              >
                <Icon size={16} strokeWidth={1.5} className={cn("shrink-0 mt-0.5", styles.iconColor)} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  {t.title && <p className="text-sm font-medium text-text-primary">{t.title}</p>}
                  <p className="text-sm text-text-secondary">{t.message}</p>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  aria-label="Dismiss notification"
                  className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
