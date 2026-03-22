import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantConfig: Record<AlertVariant, { icon: typeof Info; bg: string; border: string; iconColor: string; titleColor: string }> = {
  success: {
    icon: CheckCircle,
    bg: "bg-sage-50",
    border: "border-sage-200",
    iconColor: "text-sage-600",
    titleColor: "text-sage-800",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-sand-50",
    border: "border-sand-200",
    iconColor: "text-sand-600",
    titleColor: "text-sand-800",
  },
  error: {
    icon: XCircle,
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconColor: "text-rose-600",
    titleColor: "text-rose-800",
  },
  info: {
    icon: Info,
    bg: "bg-slate-50",
    border: "border-slate-200",
    iconColor: "text-slate-600",
    titleColor: "text-slate-800",
  },
};

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-md border p-4",
        config.bg,
        config.border,
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.5} className={cn("shrink-0 mt-0.5", config.iconColor)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("text-sm font-medium mb-0.5", config.titleColor)}>{title}</p>
        )}
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
    </div>
  );
}
