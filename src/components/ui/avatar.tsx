import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
};

const colorPairs = [
  { bg: "bg-indigo-100", text: "text-indigo-800" },
  { bg: "bg-sage-100", text: "text-sage-800" },
  { bg: "bg-rose-100", text: "text-rose-800" },
  { bg: "bg-teal-100", text: "text-teal-800" },
  { bg: "bg-lav-100", text: "text-lav-800" },
  { bg: "bg-sand-100", text: "text-sand-800" },
  { bg: "bg-slate-100", text: "text-slate-800" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % colorPairs.length;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const colors = colorPairs[getColorIndex(name)];

  const pixelSizes: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 44 };

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className={cn(
          "rounded-full object-cover border border-border-soft",
          sizeStyles[size],
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-medium",
        sizeStyles[size],
        colors.bg,
        colors.text,
        className,
      )}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
