"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";
import { Play, RotateCcw } from "lucide-react";

const simulatedCurve = Array.from({ length: 40 }, (_, i) => {
  const t = i * 0.5;
  return {
    time: t.toFixed(1),
    crystallinity: Math.min(100, (1 - Math.exp(-0.05 * Math.pow(t, 2.5))) * 100),
    temperature: 200 - t * 4,
  };
});

export default function SimulationPage() {
  const [running, setRunning] = useState(false);

  return (
    <MainLayout title="Simulation" subtitle="Crystallization modeling tools">
      <div className="space-y-6">
        {/* Setup + Results */}
        <div className="grid grid-cols-3 gap-4">
          {/* Parameters panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Simulation Setup</CardTitle>
              <CardDescription>Configure crystallization model parameters</CardDescription>
            </CardHeader>
            <div className="space-y-4">
              <Select
                label="Polymer"
                options={[
                  { value: "hdpe", label: "HDPE" },
                  { value: "ipp", label: "iPP" },
                  { value: "pet", label: "PET" },
                  { value: "pla", label: "PLA" },
                ]}
              />
              <Select
                label="Model"
                options={[
                  { value: "avrami", label: "Avrami (isothermal)" },
                  { value: "ozawa", label: "Ozawa (non-isothermal)" },
                  { value: "nakamura", label: "Nakamura" },
                ]}
              />
              <Input label="Temperature (°C)" type="number" defaultValue="125" />
              <Input label="Cooling Rate (°C/min)" type="number" defaultValue="10" />
              <Input label="Avrami exponent (n)" type="number" defaultValue="2.8" />

              <div className="flex gap-2 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setRunning(!running)}
                  className="flex-1"
                >
                  <Play size={14} />
                  {running ? "Running..." : "Run Simulation"}
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw size={14} />
                </Button>
              </div>
            </div>
          </Card>

          {/* Results panel */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Simulation Results</CardTitle>
                  <CardDescription>HDPE — Avrami model @ 125°C</CardDescription>
                </div>
                <Badge variant={running ? "indigo" : "sage"}>
                  {running ? "running" : "complete"}
                </Badge>
              </div>
            </CardHeader>
            <SimpleAreaChart
              data={simulatedCurve}
              xKey="time"
              yKey="crystallinity"
              color="#2EB5AD"
              height={280}
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-surface-1 rounded-sm p-3">
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary">t₁/₂</div>
                <div className="text-lg font-light text-text-primary mt-0.5">3.8 min</div>
              </div>
              <div className="bg-surface-1 rounded-sm p-3">
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Final X_c</div>
                <div className="text-lg font-light text-text-primary mt-0.5">98.2%</div>
              </div>
              <div className="bg-surface-1 rounded-sm p-3">
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary">R²</div>
                <div className="text-lg font-light text-text-primary mt-0.5">0.997</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Queue */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Queue</CardTitle>
            <CardDescription>Batch parameter sweep — cooling rate study</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {[
              { name: "HDPE @ 5°C/min", progress: 100, status: "complete" },
              { name: "HDPE @ 10°C/min", progress: 100, status: "complete" },
              { name: "HDPE @ 20°C/min", progress: 67, status: "running" },
              { name: "HDPE @ 40°C/min", progress: 0, status: "pending" },
            ].map((sim) => (
              <div key={sim.name} className="flex items-center gap-4">
                <Badge
                  variant={sim.status === "complete" ? "sage" : sim.status === "running" ? "indigo" : "slate"}
                >
                  {sim.status}
                </Badge>
                <span className="text-sm text-text-primary w-40">{sim.name}</span>
                <div className="flex-1">
                  <ProgressBar value={sim.progress} />
                </div>
                <span className="text-xs font-mono text-text-tertiary w-10 text-right">{sim.progress}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
