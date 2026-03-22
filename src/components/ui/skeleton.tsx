interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = "", width, height }: SkeletonProps) {
  return (
    <div
      className={`rounded-sm bg-surface-2 animate-shimmer ${className}`}
      style={{
        width,
        height,
        backgroundImage:
          "linear-gradient(90deg, var(--color-surface-2) 0%, var(--color-surface-1) 50%, var(--color-surface-2) 100%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
