import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, helperText, options, className, id, ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "h-9 px-3 bg-surface-0 border rounded-sm",
          "text-sm text-text-primary",
          "transition-all duration-150 appearance-none",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20d%3D%22M3%205l3%203%203-3%22%20stroke%3D%22%236B6860%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')]",
          "bg-[position:right_10px_center] bg-no-repeat pr-8",
          "focus:outline-none focus:ring-3",
          error
            ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/15"
            : "border-border-med focus:border-indigo-400 focus:ring-indigo-400/15",
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-rose-600">{error}</p>}
      {helperText && !error && <p className="text-[11px] text-text-tertiary">{helperText}</p>}
    </div>
  );
}
