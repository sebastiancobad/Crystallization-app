import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          h-9 px-3 bg-surface-0 border border-border-med rounded-sm
          text-sm text-text-primary placeholder:text-text-tertiary
          transition-all duration-150
          focus:outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
