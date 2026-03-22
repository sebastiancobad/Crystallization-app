"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Search
          size={14}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
        />
        <input
          ref={ref}
          type="search"
          className={cn(
            "w-full h-9 pl-9 pr-3 text-sm bg-surface-0 border border-border-med rounded-md",
            "text-text-primary placeholder:text-text-tertiary",
            "focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400",
            "transition-all duration-150",
          )}
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
