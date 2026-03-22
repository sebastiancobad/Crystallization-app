import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="grid grid-cols-[220px_1fr] min-h-screen">
      <Sidebar />

      <main className="overflow-y-auto">
        {/* Sticky topbar */}
        <div className="sticky top-0 z-20 h-[52px] bg-canvas/85 backdrop-blur-md border-b border-border-soft px-6 flex items-center justify-between">
          <h1 className="text-sm font-medium text-text-primary">{title ?? "PolymerCryst"}</h1>
          {subtitle && (
            <span className="text-xs text-text-tertiary">{subtitle}</span>
          )}
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-7 pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
