"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Pagination">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-8 w-8 flex items-center justify-center rounded-sm text-text-secondary hover:bg-surface-1 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="h-8 w-8 flex items-center justify-center text-xs text-text-tertiary">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange?.(page as number)}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-sm text-sm transition-colors",
              currentPage === page
                ? "bg-indigo-50 text-indigo-600 font-medium"
                : "text-text-secondary hover:bg-surface-1",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="h-8 w-8 flex items-center justify-center rounded-sm text-text-secondary hover:bg-surface-1 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>
    </nav>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}
