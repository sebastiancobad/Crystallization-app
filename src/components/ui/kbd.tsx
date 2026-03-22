import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KbdProps {
  children: ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center h-5 min-w-[20px] px-1.5",
        "text-[11px] font-mono font-medium text-text-secondary",
        "bg-surface-1 border border-border-med rounded",
        "shadow-[0_1px_0_1px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
