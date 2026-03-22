"use client";

import { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[rgba(15,15,20,0.35)] backdrop-blur-[4px]"
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 w-full max-w-[560px] bg-surface-0 rounded-xl shadow-lg border border-[rgba(0,0,0,0.08)]"
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-soft">
                <h2 className="text-base font-medium text-text-primary">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-text-tertiary hover:text-text-primary transition-colors duration-150"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="px-5 py-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border-soft">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
