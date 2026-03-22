import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ label, error, helperText, className, id, ...props }: TextareaProps) {
  const autoId = useId();
  const textareaId = id || autoId;
  const errorId = error ? `${textareaId}-error` : undefined;
  const helperId = helperText && !error ? `${textareaId}-helper` : undefined;
  const describedBy = errorId || helperId || undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "px-3 py-2 bg-surface-0 border rounded-sm",
          "text-sm text-text-primary placeholder:text-text-tertiary",
          "transition-all duration-150 resize-y min-h-[80px]",
          "focus:outline-none focus:ring-3",
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/15"
            : "border-border-med focus:border-indigo-400 focus:ring-indigo-400/15",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      {error && <p id={errorId} role="alert" className="text-[11px] text-rose-600">{error}</p>}
      {helperText && !error && <p id={helperId} className="text-[11px] text-text-tertiary">{helperText}</p>}
    </div>
  );
}
