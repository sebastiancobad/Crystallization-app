"use client";

import { type ReactNode } from "react";
import {
  BookOpen,
  Layers,
  Activity,
  Sliders,
  Database,
  Users,
  BarChart2,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Explore",
    items: [
      { icon: BookOpen, label: "Theory Hub", href: "/theory", active: true },
      { icon: Layers, label: "SSA Module", href: "/ssa" },
      { icon: Activity, label: "SAXS / WAXS", href: "/saxs" },
      { icon: BarChart2, label: "Kinetics", href: "/kinetics" },
    ],
  },
  {
    title: "Tools",
    items: [
      { icon: Sliders, label: "Simulation", href: "/simulation" },
      { icon: Database, label: "Database", href: "/database" },
      { icon: Users, label: "Researchers", href: "/researchers" },
    ],
  },
];

function SidebarNavItem({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href}
      className={`flex items-center gap-2 h-[34px] px-2.5 text-sm transition-colors duration-150 ${
        item.active
          ? "bg-indigo-50 text-indigo-600 border-l-2 border-indigo-400 rounded-r-sm"
          : "text-text-secondary hover:bg-surface-1 hover:text-text-primary rounded-sm"
      }`}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span className="font-normal">{item.label}</span>
    </a>
  );
}

export function Sidebar() {
  return (
    <aside className="w-[220px] h-screen bg-surface-0 border-r border-border-soft flex flex-col shrink-0">
      {/* Logo area */}
      <div className="h-[60px] flex items-center gap-2 px-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-indigo-400"
          >
            <path
              d="M3 8h2l2-4 2 8 2-4h2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[15px] font-medium tracking-[-0.3px] text-text-primary">
          PolymerCryst
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title}>
            <div className="px-2.5 mt-5 mb-1 text-[10px] font-medium tracking-[0.8px] uppercase text-text-tertiary">
              {group.title}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <SidebarNavItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
