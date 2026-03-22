import type { ReactNode } from "react";

type BadgeVariant = "indigo" | "sage" | "rose" | "sand" | "slate" | "teal" | "lav";

const variantStyles: Record<BadgeVariant, string> = {
  indigo: "bg-indigo-50 text-indigo-800 border-indigo-600",
  sage: "bg-sage-50 text-sage-800 border-sage-600",
  rose: "bg-rose-50 text-rose-800 border-rose-600",
  sand: "bg-sand-50 text-sand-800 border-sand-600",
  slate: "bg-slate-50 text-slate-800 border-slate-600",
  teal: "bg-teal-50 text-teal-800 border-teal-600",
  lav: "bg-lav-50 text-lav-800 border-lav-600",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "indigo", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        rounded-sm text-[11px] font-medium
        border-[0.5px]
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
