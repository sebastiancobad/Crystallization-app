"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ checked = false, onChange, label, disabled = false, className }: CheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onChange?.(!checked);
          }
        }}
        className={cn(
          "flex items-center justify-center h-4 w-4 rounded-sm border transition-all duration-150 shrink-0",
          checked
            ? "bg-indigo-400 border-indigo-400"
            : "bg-surface-0 border-border-hard hover:border-indigo-400",
        )}
      >
        {checked && <Check size={12} strokeWidth={2.5} className="text-white" />}
      </button>
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  );
}
