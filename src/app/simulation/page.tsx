"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EquationBlock } from "@/components/ui/equation-block";
import { Tabs } from "@/components/ui/tabs";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";
import { Play, RotateCcw } from "lucide-react";

function generateAvramiCurve(k: number, n: number, tMax: number) {
  return Array.from({ length: 50 }, (_, i) => {
    const t = (i / 49) * tMax;
    const X = (1 - Math.exp(-k * Math.pow(t, n))) * 100;
    return { time: t.toFixed(1), crystallinity: +X.toFixed(2) };
  });
}

export default function SimulationPage() {
  const [n, setN] = useState(2.8);
  const [logK, setLogK] = useState(-2.1);
  const [tMax, setTMax] = useState(40);
  const [hasRun, setHasRun] = useState(false);

  const k = Math.pow(10, logK);
  const halfTime = Math.pow(Math.LN2 / k, 1 / n);
  const curveData = useMemo(() => generateAvramiCurve(k, n, tMax), [k, n, tMax]);

  return (
    <MainLayout title="Simulation" subtitle="Crystallization modeling tools">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-slate-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Crystallization Simulation
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Model isothermal crystallization kinetics using the Avrami equation.
            Adjust parameters and see the predicted conversion curve in real time.
          </p>
        </div>

        <Tabs
          tabs={[
            {
              id: "avrami-sim",
              label: "Avrami Model",
              content: (
                <div className="grid grid-cols-3 gap-4">
                  {/* Parameters */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Parameters</CardTitle>
                      <CardDescription>Adjust Avrami equation inputs</CardDescription>
                    </CardHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-text-primary block mb-1">
                          Avrami exponent (n): {n}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="4"
                          step="0.1"
                          value={n}
                          onChange={(e) => { setN(+e.target.value); setHasRun(true); }}
                          className="w-full accent-[#1B3A6B]"
                        />
                        <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
                          <span>1 (1D)</span>
                          <span>2 (2D)</span>
                          <span>3 (3D)</span>
                          <span>4 (3D+sporadic)</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-text-primary block mb-1">
                          log(k): {logK.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="-4"
                          max="0"
                          step="0.1"
                          value={logK}
                          onChange={(e) => { setLogK(+e.target.value); setHasRun(true); }}
                          className="w-full accent-[#1B3A6B]"
                        />
                        <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
                          <span>-4 (slow)</span>
                          <span>0 (fast)</span>
                        </div>
                      </div>

                      <Input
                        label="Time range (min)"
                        type="number"
                        value={tMax}
                        onChange={(e) => setTMax(+e.target.value || 40)}
                      />

                      <div className="bg-surface-1 rounded-md p-3 mt-2">
                        <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Predicted t₁/₂</div>
                        <div className="text-lg font-light font-mono text-text-primary mt-0.5">
                          {isFinite(halfTime) ? halfTime.toFixed(1) : "—"} min
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => setHasRun(true)}
                      >
                        <Play size={14} />
                        Update Simulation
                      </Button>
                    </div>
                  </Card>

                  {/* Results */}
                  <Card className="col-span-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Predicted Conversion Curve</CardTitle>
                          <CardDescription>
                            X(t) = 1 − exp(−k·t^n) with n={n}, k={k.toExponential(2)}
                          </CardDescription>
                        </div>
                        <Badge variant={hasRun ? "sage" : "slate"}>
                          {hasRun ? "calculated" : "waiting"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <SimpleAreaChart
                      data={curveData}
                      xKey="time"
                      yKey="crystallinity"
                      color="#1B3A6B"
                      height={300}
                    />
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      <div className="bg-surface-1 rounded-sm p-3">
                        <div className="text-[10px] uppercase tracking-wider text-text-tertiary">n</div>
                        <div className="text-lg font-light font-mono text-text-primary mt-0.5">{n}</div>
                      </div>
                      <div className="bg-surface-1 rounded-sm p-3">
                        <div className="text-[10px] uppercase tracking-wider text-text-tertiary">k</div>
                        <div className="text-lg font-light font-mono text-text-primary mt-0.5">{k.toExponential(2)}</div>
                      </div>
                      <div className="bg-surface-1 rounded-sm p-3">
                        <div className="text-[10px] uppercase tracking-wider text-text-tertiary">t₁/₂</div>
                        <div className="text-lg font-light font-mono text-text-primary mt-0.5">
                          {isFinite(halfTime) ? halfTime.toFixed(1) : "—"} min
                        </div>
                      </div>
                      <div className="bg-surface-1 rounded-sm p-3">
                        <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Final X_c</div>
                        <div className="text-lg font-light font-mono text-text-primary mt-0.5">
                          {curveData[curveData.length - 1]?.crystallinity.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              id: "theory",
              label: "Model Reference",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Avrami Equation</CardTitle>
                    <CardDescription>Reference for the model used in this simulator</CardDescription>
                  </CardHeader>
                  <div className="space-y-4">
                    <EquationBlock latex="X(t) = 1 - \exp\!\left(-k \, t^n\right)" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-2">Parameter n (exponent)</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Encodes the growth dimensionality and nucleation mechanism.
                          n = d + 1 for thermal nucleation, n = d for athermal nucleation,
                          where d = 1 (rod), 2 (disk), 3 (sphere).
                        </p>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-2">Parameter k (rate constant)</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Contains nucleation rate and growth rate information.
                          k = (f/n)·N₀·Gⁿ for athermal nucleation. Higher k → faster crystallization.
                          k is strongly temperature-dependent.
                        </p>
                      </div>
                    </div>

                    <EquationBlock latex="t_{1/2} = \left(\frac{\ln 2}{k}\right)^{1/n}" />
                  </div>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
