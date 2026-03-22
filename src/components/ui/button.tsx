"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  href?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-400 text-white border-transparent shadow-[0_1px_3px_rgba(46,181,173,0.3)] hover:bg-indigo-600 hover:shadow-[0_2px_6px_rgba(46,181,173,0.4)] active:scale-[0.98]",
  secondary:
    "bg-transparent border-border-med text-text-secondary hover:bg-surface-1 hover:border-border-hard hover:text-text-primary",
  ghost:
    "bg-transparent border-transparent text-text-secondary hover:bg-surface-1 hover:text-text-primary",
  destructive:
    "bg-transparent border-border-med text-text-secondary hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 px-2.5 text-xs gap-1.5 rounded-sm",
  md: "h-9 px-4 text-sm gap-2 rounded-sm",
  lg: "h-11 px-6 text-sm gap-2 rounded-md",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  href,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium border transition-all duration-150 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    loading && "pointer-events-none",
    className,
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size={size === "sm" ? 12 : 16} />}
      {children}
    </button>
  );
}
