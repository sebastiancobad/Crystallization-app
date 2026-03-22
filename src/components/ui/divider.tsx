import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3 my-4", className)}>
        <div className="flex-1 h-px bg-border-soft" />
        <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wide">{label}</span>
        <div className="flex-1 h-px bg-border-soft" />
      </div>
    );
  }

  return <hr className={cn("border-0 h-px bg-border-soft my-4", className)} />;
}
