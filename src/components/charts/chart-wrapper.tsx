"use client";

import { type ReactNode } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const chartColors = [
  "#4F6AE8", // navy-400
  "#82A876", // sage-400
  "#D8829A", // rose-400
  "#C9A05A", // sand-400
  "#7D94CE", // slate-400
  "#62B5A8", // teal-400
  "#C4885A", // copper-400
];

interface ChartWrapperProps {
  children: ReactNode;
  height?: number;
  className?: string;
}

export function ChartWrapper({ children, height = 240, className = "" }: ChartWrapperProps) {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}

interface SimpleAreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function SimpleAreaChart({
  data,
  xKey,
  yKey,
  color = chartColors[0],
  height = 240,
  className = "",
}: SimpleAreaChartProps) {
  return (
    <ChartWrapper height={height} className={className}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${yKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#A09D98" }}
          axisLine={{ stroke: "rgba(0,0,0,0.06)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#A09D98" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${yKey})`}
        />
      </AreaChart>
    </ChartWrapper>
  );
}

interface SimpleBarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  className?: string;
}

export function SimpleBarChart({
  data,
  xKey,
  yKey,
  color = chartColors[1],
  height = 240,
  className = "",
}: SimpleBarChartProps) {
  return (
    <ChartWrapper height={height} className={className}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#A09D98" }}
          axisLine={{ stroke: "rgba(0,0,0,0.06)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#A09D98" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
            fontSize: "12px",
          }}
        />
        <Bar dataKey={yKey} fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}

export { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer };
