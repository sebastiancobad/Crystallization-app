"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/table";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ssaData = [
  { step: "Self-nucleation", temp: 160, hold: 5, status: "complete" },
  { step: "Annealing 1", temp: 145, hold: 10, status: "complete" },
  { step: "Annealing 2", temp: 140, hold: 10, status: "complete" },
  { step: "Annealing 3", temp: 135, hold: 10, status: "running" },
  { step: "Annealing 4", temp: 130, hold: 10, status: "pending" },
  { step: "Annealing 5", temp: 125, hold: 10, status: "pending" },
];

const fractionData = [
  { fraction: "F1", Tm: "155.2", area: "12.4", pct: 18 },
  { fraction: "F2", Tm: "148.7", area: "22.1", pct: 32 },
  { fraction: "F3", Tm: "142.3", area: "18.9", pct: 27 },
  { fraction: "F4", Tm: "136.1", area: "10.2", pct: 15 },
  { fraction: "F5", Tm: "129.8", area: "5.6", pct: 8 },
];

const thermalCurve = Array.from({ length: 40 }, (_, i) => ({
  temp: 100 + i * 2,
  heat: Math.random() * 2 + (i > 15 && i < 25 ? Math.exp(-((i - 20) ** 2) / 8) * 12 : 0),
}));

export default function SSAPage() {
  return (
    <MainLayout title="SSA Module" subtitle="Successive Self-Nucleation & Annealing">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Fractions" value="5" subtext="identified" />
          <MetricCard label="T_sn" value="160°C" subtext="self-nucleation" />
          <MetricCard label="ΔT_s" value="5°C" subtext="step interval" />
          <MetricCard label="Progress" value="50%" subtext="3 of 6 steps" />
        </div>

        {/* SSA Protocol + Thermal Curve */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SSA Protocol</CardTitle>
                  <CardDescription>Current thermal fractionation steps</CardDescription>
                </div>
                <Button variant="secondary" size="sm">
                  <Plus size={14} /> Add Step
                </Button>
              </div>
            </CardHeader>
            <div className="space-y-2">
              {ssaData.map((step) => (
                <div key={step.step} className="flex items-center justify-between px-2 py-2 rounded-sm hover:bg-surface-1 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        step.status === "complete" ? "sage" : step.status === "running" ? "indigo" : "slate"
                      }
                    >
                      {step.status}
                    </Badge>
                    <span className="text-sm text-text-primary">{step.step}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-secondary font-mono">
                    <span>{step.temp}°C</span>
                    <span>{step.hold} min</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final Heating Scan</CardTitle>
              <CardDescription>DSC endotherm after SSA treatment</CardDescription>
            </CardHeader>
            <SimpleAreaChart
              data={thermalCurve}
              xKey="temp"
              yKey="heat"
              color="#2EB5AD"
              height={220}
            />
          </Card>
        </div>

        {/* Fraction Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Lamellar Fractions</CardTitle>
            <CardDescription>Thermal fractionation results — each peak corresponds to a crystal population</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {fractionData.map((f) => (
              <div key={f.fraction} className="flex items-center gap-4">
                <Badge variant="sage">{f.fraction}</Badge>
                <span className="text-xs text-text-secondary w-20">Tm = {f.Tm}°C</span>
                <span className="text-xs text-text-secondary w-24">Area = {f.area} J/g</span>
                <div className="flex-1">
                  <ProgressBar value={f.pct} label={f.fraction} />
                </div>
                <span className="text-xs font-mono text-text-tertiary w-10 text-right">{f.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
