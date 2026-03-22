"use client";

import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ options, value, onChange, className }: RadioGroupProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)} role="radiogroup">
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className="flex items-start gap-2.5 cursor-pointer"
          >
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange?.(option.value)}
              className={cn(
                "mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 transition-all duration-150 flex items-center justify-center",
                isSelected
                  ? "border-indigo-400"
                  : "border-border-hard hover:border-indigo-400",
              )}
            >
              {isSelected && (
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
              )}
            </button>
            <div>
              <span className="text-sm text-text-primary">{option.label}</span>
              {option.description && (
                <p className="text-xs text-text-tertiary mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
