import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = "", id, ...props }: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
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
        className={`
          px-3 py-2 bg-surface-0 border border-border-med rounded-sm
          text-sm text-text-primary placeholder:text-text-tertiary
          transition-all duration-150 resize-y min-h-[80px]
          focus:outline-none focus:border-indigo-400 focus:ring-3 focus:ring-indigo-400/15
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
