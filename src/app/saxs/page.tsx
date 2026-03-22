"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/table";
import { EquationBlock } from "@/components/ui/equation-block";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";

const saxsProfile = Array.from({ length: 50 }, (_, i) => {
  const q = 0.01 + i * 0.01;
  const peak = Math.exp(-((q - 0.15) ** 2) / 0.002) * 800;
  const bg = 200 / (1 + q * 40);
  return { q: q.toFixed(3), intensity: Math.round(peak + bg + Math.random() * 20) };
});

const waxsProfile = Array.from({ length: 50 }, (_, i) => {
  const twoTheta = 10 + i * 0.6;
  const p1 = Math.exp(-((twoTheta - 21.5) ** 2) / 0.8) * 500;
  const p2 = Math.exp(-((twoTheta - 24.0) ** 2) / 0.5) * 350;
  const p3 = Math.exp(-((twoTheta - 27.2) ** 2) / 0.6) * 200;
  const amorphous = Math.exp(-((twoTheta - 22) ** 2) / 30) * 80;
  return { twoTheta: twoTheta.toFixed(1), intensity: Math.round(p1 + p2 + p3 + amorphous + Math.random() * 15) };
});

const sampleData = [
  { id: "S001", polymer: "HDPE", longPeriod: "22.4", lamellar: "14.8", crystallinity: "66" },
  { id: "S002", polymer: "iPP (α)", longPeriod: "18.7", lamellar: "10.2", crystallinity: "55" },
  { id: "S003", polymer: "PET", longPeriod: "12.3", lamellar: "6.1", crystallinity: "42" },
  { id: "S004", polymer: "PLA", longPeriod: "15.1", lamellar: "7.5", crystallinity: "38" },
  { id: "S005", polymer: "PEEK", longPeriod: "10.8", lamellar: "5.4", crystallinity: "35" },
];

export default function SAXSPage() {
  return (
    <MainLayout title="SAXS / WAXS" subtitle="X-ray scattering analysis">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Long Period (L)" value="22.4 nm" subtext="HDPE reference" />
          <MetricCard label="Lamellar Thickness" value="14.8 nm" subtext="from correlation fn." />
          <MetricCard label="Linear Crystallinity" value="66%" subtext="l_c / L" />
          <MetricCard label="Samples Measured" value="5" subtext="current batch" />
        </div>

        {/* Scattering profiles */}
        <Tabs
          tabs={[
            {
              id: "saxs",
              label: "SAXS Profile",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Small-Angle X-ray Scattering</CardTitle>
                    <CardDescription>I(q) vs q — long-period peak from lamellar stacking</CardDescription>
                  </CardHeader>
                  <SimpleAreaChart data={saxsProfile} xKey="q" yKey="intensity" color="#1B3A6B" height={260} />
                  <div className="mt-4">
                    <EquationBlock latex="L = \frac{2\pi}{q^*}" />
                  </div>
                </Card>
              ),
            },
            {
              id: "waxs",
              label: "WAXS Profile",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Wide-Angle X-ray Scattering</CardTitle>
                    <CardDescription>I(2θ) — crystal plane reflections</CardDescription>
                  </CardHeader>
                  <SimpleAreaChart data={waxsProfile} xKey="twoTheta" yKey="intensity" color="#C9A05A" height={260} />
                  <div className="mt-4">
                    <EquationBlock latex="d_{hkl} = \frac{\lambda}{2\sin\theta}" />
                  </div>
                </Card>
              ),
            },
          ]}
        />

        {/* Sample table */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Summary</CardTitle>
            <CardDescription>Structural parameters from combined SAXS/WAXS analysis</CardDescription>
          </CardHeader>
          <DataTable
            columns={[
              { key: "id", header: "ID" },
              { key: "polymer", header: "Polymer" },
              { key: "longPeriod", header: "L (nm)", numeric: true },
              { key: "lamellar", header: "l_c (nm)", numeric: true },
              { key: "crystallinity", header: "X_c (%)", numeric: true, render: (row) => (
                <div className="flex items-center justify-end gap-2">
                  <span>{row.crystallinity as string}%</span>
                  <Badge variant={Number(row.crystallinity) > 50 ? "sage" : "sand"}>
                    {Number(row.crystallinity) > 50 ? "high" : "moderate"}
                  </Badge>
                </div>
              )},
            ]}
            data={sampleData}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
