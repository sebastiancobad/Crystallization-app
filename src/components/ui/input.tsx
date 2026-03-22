import { useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, className, id, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText && !error ? `${inputId}-helper` : undefined;
  const describedBy = errorId || helperId || undefined;

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
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-9 px-3 bg-surface-0 border rounded-sm",
          "text-sm text-text-primary placeholder:text-text-tertiary",
          "transition-all duration-150",
          "focus:outline-none focus:ring-3",
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/15"
            : "border-border-med focus:border-indigo-400 focus:ring-indigo-400/15",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-[11px] text-rose-600">{error}</p>
      )}
      {helperText && !error && (
        <p id={helperId} className="text-[11px] text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}
