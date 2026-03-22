import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1", className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight size={12} strokeWidth={1.5} className="text-text-tertiary" />
            )}
            {isLast || !item.href ? (
              <span
                className={cn(
                  "text-xs",
                  isLast ? "font-medium text-text-primary" : "text-text-tertiary",
                )}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}

interface BreadcrumbSlotProps {
  children: ReactNode;
  className?: string;
}

export function BreadcrumbSlot({ children, className }: BreadcrumbSlotProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}
