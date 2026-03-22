"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, align = "left", className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const actionItems = items.filter((item) => !item.divider);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % actionItems.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + actionItems.length) % actionItems.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < actionItems.length) {
            actionItems[focusedIndex].onClick?.();
            setOpen(false);
          }
          break;
      }
    },
    [open, focusedIndex, actionItems],
  );

  useEffect(() => {
    if (open && menuRef.current) {
      const buttons = menuRef.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"]');
      buttons[focusedIndex]?.focus();
    }
  }, [focusedIndex, open]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)} onKeyDown={handleKeyDown}>
      <div
        onClick={() => { setOpen(!open); if (!open) setFocusedIndex(0); }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] py-1 bg-surface-0 border border-border-soft rounded-md shadow-lg",
            "animate-in fade-in-0 zoom-in-95",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-border-soft my-1" role="separator" />
            ) : (
              <button
                key={i}
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
                  item.danger
                    ? "text-rose-600 hover:bg-rose-50"
                    : "text-text-primary hover:bg-surface-1",
                )}
              >
                {item.icon && <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4 text-text-tertiary" aria-hidden="true">{item.icon}</span>}
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
