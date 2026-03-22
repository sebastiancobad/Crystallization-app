interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label || "Progress"}
      className={`h-[3px] w-full bg-surface-2 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-indigo-400 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
