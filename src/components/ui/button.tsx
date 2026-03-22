import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-400 text-white border-none shadow-[0_1px_3px_rgba(139,142,232,0.3)] hover:bg-indigo-600 hover:shadow-[0_2px_6px_rgba(139,142,232,0.4)] active:scale-[0.98]",
  secondary:
    "bg-transparent border border-border-med text-text-secondary hover:bg-surface-1 hover:border-border-hard hover:text-text-primary",
  destructive:
    "bg-transparent border border-border-med text-text-secondary hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600",
};

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-sm text-sm font-medium
        transition-all duration-150 ease-out
        disabled:opacity-50 disabled:pointer-events-none
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
