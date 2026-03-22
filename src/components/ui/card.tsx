import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function Card({ children, className = "", interactive = false }: CardProps) {
  return (
    <div
      className={`
        bg-surface-0 border border-border-soft rounded-md shadow-sm p-5
        ${interactive ? "transition-all duration-200 ease-spring hover:shadow-md hover:-translate-y-px cursor-pointer" : ""}
        ${className}
      `}
      style={interactive ? undefined : { boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.8)" }}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

export function FeatureCard({ children, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`bg-surface-0 border border-border-soft rounded-lg shadow-sm p-5 ${className}`}
      style={{ boxShadow: "var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,1)" }}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
  className?: string;
}

export function MetricCard({ label, value, subtext, className = "" }: MetricCardProps) {
  return (
    <div className={`bg-surface-1 rounded-sm p-4 ${className}`}>
      <div className="text-[11px] font-medium uppercase tracking-[0.3px] text-text-tertiary">
        {label}
      </div>
      <div className="text-[28px] font-light tracking-[-1px] text-text-primary mt-1">
        {value}
      </div>
      {subtext && (
        <div className="text-xs text-text-tertiary font-mono mt-0.5">{subtext}</div>
      )}
    </div>
  );
}
