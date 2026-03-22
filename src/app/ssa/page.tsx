"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { Divider } from "@/components/ui/divider";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ChevronDown, ChevronRight } from "lucide-react";

/* SSA thermal curve demo data */
const ssaHeatingCurve = Array.from({ length: 60 }, (_, i) => {
  const T = 80 + i * 1.5;
  /* Simulate multiple melting endotherms from SSA fractions */
  const p1 = Math.exp(-((T - 125) ** 2) / 3) * 4;
  const p2 = Math.exp(-((T - 132) ** 2) / 3) * 7;
  const p3 = Math.exp(-((T - 138) ** 2) / 2.5) * 10;
  const p4 = Math.exp(-((T - 143) ** 2) / 2) * 6;
  const p5 = Math.exp(-((T - 148) ** 2) / 2) * 3;
  const baseline = 0.3;
  return { temp: T.toFixed(0), heatFlow: +(p1 + p2 + p3 + p4 + p5 + baseline).toFixed(2) };
});

const standardDscCurve = Array.from({ length: 60 }, (_, i) => {
  const T = 80 + i * 1.5;
  const single = Math.exp(-((T - 136) ** 2) / 15) * 12;
  return { temp: T.toFixed(0), heatFlow: +(single + 0.3).toFixed(2) };
});

export default function SSAPage() {
  return (
    <MainLayout title="SSA Module" subtitle="Successive Self-Nucleation & Annealing">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-sage-50 via-surface-0 to-indigo-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Successive Self-Nucleation and Annealing (SSA)
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            A thermal fractionation technique developed by Müller et al. that separates a
            semicrystalline polymer into populations of crystallites with distinct lamellar thicknesses,
            revealing the methylene sequence length distribution or branching heterogeneity.
          </p>
        </div>

        {/* Theory & Principle */}
        <Tabs
          tabs={[
            {
              id: "principle",
              label: "Principle",
              content: (
                <Card>
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      SSA exploits the fact that different crystal populations melt at different
                      temperatures. By selectively melting and annealing at progressively lower
                      temperatures, each fraction is thermally isolated and perfected, producing
                      distinct melting peaks in the final heating scan.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">What It Reveals</h5>
                        <ul className="text-xs text-text-secondary leading-relaxed space-y-1 list-disc pl-4">
                          <li>Distribution of lamellar thicknesses</li>
                          <li>Short-chain branching distribution (SCB) in polyethylenes</li>
                          <li>Comonomer incorporation and sequence length heterogeneity</li>
                          <li>Comparison of catalyst types (Ziegler-Natta vs metallocene)</li>
                          <li>Blending and miscibility in polymer blends</li>
                        </ul>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">Advantages over Standard DSC</h5>
                        <ul className="text-xs text-text-secondary leading-relaxed space-y-1 list-disc pl-4">
                          <li>Resolves crystal populations hidden in a single broad DSC peak</li>
                          <li>No solvents needed (unlike TREF/CRYSTAF)</li>
                          <li>Fast — performed in a single DSC instrument</li>
                          <li>Quantitative: peak areas proportional to mass fractions</li>
                          <li>Sensitive to small compositional differences</li>
                        </ul>
                      </div>
                    </div>

                    <Divider />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                        Relating Tm to Lamellar Thickness
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Each SSA melting peak at temperature Tm,i corresponds to a crystal population
                        with lamellar thickness l_i via the Thomson-Gibbs equation:
                      </p>
                      <EquationBlock latex="l_i = \frac{2\sigma_e T_m^0}{\Delta h_f (T_m^0 - T_{m,i})}" />
                      <p className="text-xs text-text-tertiary">
                        For polyethylene: σ_e ≈ 90 mJ/m², Δh_f ≈ 288 J/cm³, T°m ≈ 141.5°C.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                        Methylene Sequence Length
                      </h4>
                      <p className="text-xs text-text-secondary mb-2">
                        For branched polyethylenes, lamellar thickness maps to the longest unbranched
                        methylene sequence n that fits in the crystal:
                      </p>
                      <EquationBlock latex="n_i = \frac{l_i}{0.127 \text{ nm}}" />
                      <p className="text-xs text-text-tertiary">
                        0.127 nm = projection of a CH₂ unit along the c-axis in the orthorhombic PE unit cell.
                      </p>
                    </div>
                  </div>
                </Card>
              ),
            },
            {
              id: "protocol",
              label: "Protocol Steps",
              content: (
                <Card>
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed mb-2">
                      The SSA protocol consists of carefully designed thermal cycles.
                      Each step must be executed precisely:
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          step: "Step 1 — Erase thermal history",
                          desc: "Heat to Tm + 20–30°C and hold for 3–5 min to completely melt all crystals and erase any prior processing memory.",
                          badge: "Preparation",
                          color: "slate" as const,
                        },
                        {
                          step: "Step 2 — Standard crystallization",
                          desc: "Cool at a controlled rate (typically 10°C/min) to below the crystallization temperature. This creates the initial crystal population.",
                          badge: "Cooling",
                          color: "slate" as const,
                        },
                        {
                          step: "Step 3 — Determine self-nucleation temperature (Ts)",
                          desc: "Heat to a series of temperatures near Tm to find the ideal self-nucleation domain — a narrow range where partial melting leaves crystal fragments that act as nuclei without being fully melted or annealed. This is the critical calibration step.",
                          badge: "Calibration",
                          color: "indigo" as const,
                        },
                        {
                          step: "Step 4 — First SSA cycle",
                          desc: "Heat to Ts,1 (the highest self-nucleation temperature) and hold for 5 min. This anneals the thickest crystals that survive at this temperature. Then cool to below Tc.",
                          badge: "Annealing",
                          color: "sage" as const,
                        },
                        {
                          step: "Step 5 — Repeat at lower Ts",
                          desc: "Decrease Ts by ΔTs (typically 5°C) and repeat: heat → hold → cool. Each cycle anneals progressively thinner lamellae. Continue for 5–10 steps until below the expected crystallization range.",
                          badge: "Iteration",
                          color: "sage" as const,
                        },
                        {
                          step: "Step 6 — Final heating scan",
                          desc: "Heat at standard rate (10°C/min) from below Tg to above Tm. The resulting DSC curve shows multiple distinct melting peaks — each corresponding to a crystal fraction with a specific lamellar thickness.",
                          badge: "Analysis",
                          color: "sand" as const,
                        },
                      ].map((s) => (
                        <div key={s.step} className="flex gap-3 bg-surface-1 rounded-md p-4">
                          <Badge variant={s.color} className="shrink-0 mt-0.5">{s.badge}</Badge>
                          <div>
                            <p className="text-xs font-medium text-text-primary mb-0.5">{s.step}</p>
                            <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-sand-50 border border-sand-200 rounded-md p-4 mt-4">
                      <p className="text-xs text-sand-800">
                        <strong>Critical:</strong> The self-nucleation temperature window is typically only 2–5°C wide.
                        Choosing a Ts too high will completely melt the crystals (losing the self-nucleation effect),
                        while too low will cause annealing rather than self-nucleation. A preliminary Ts scan is essential.
                      </p>
                    </div>
                  </div>
                </Card>
              ),
            },
            {
              id: "results",
              label: "Results & Analysis",
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Standard DSC (single peak)</CardTitle>
                        <CardDescription>Broad melting endotherm — hides crystal distribution</CardDescription>
                      </CardHeader>
                      <SimpleAreaChart data={standardDscCurve} xKey="temp" yKey="heatFlow" color="#3B6298" height={200} />
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>After SSA (multiple peaks)</CardTitle>
                        <CardDescription>Each peak = one crystal population with distinct lamellar thickness</CardDescription>
                      </CardHeader>
                      <SimpleAreaChart data={ssaHeatingCurve} xKey="temp" yKey="heatFlow" color="#1B3A6B" height={200} />
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fraction Analysis</CardTitle>
                      <CardDescription>
                        Each SSA peak area is proportional to the mass fraction of crystals in that population
                      </CardDescription>
                    </CardHeader>
                    <div className="space-y-3">
                      {[
                        { label: "Fraction 5 (thickest)", Tm: "148°C", l: "18.2 nm", n: "143", pct: 12 },
                        { label: "Fraction 4", Tm: "143°C", l: "14.1 nm", n: "111", pct: 22 },
                        { label: "Fraction 3 (dominant)", Tm: "138°C", l: "11.4 nm", n: "90", pct: 35 },
                        { label: "Fraction 2", Tm: "132°C", l: "9.2 nm", n: "72", pct: 22 },
                        { label: "Fraction 1 (thinnest)", Tm: "125°C", l: "7.3 nm", n: "57", pct: 9 },
                      ].map((f) => (
                        <div key={f.label} className="flex items-center gap-4">
                          <span className="text-xs text-text-primary w-44">{f.label}</span>
                          <span className="text-xs font-mono text-text-secondary w-16">Tm={f.Tm}</span>
                          <span className="text-xs font-mono text-text-secondary w-20">l={f.l}</span>
                          <span className="text-xs font-mono text-text-secondary w-14">n≈{f.n}</span>
                          <div className="flex-1">
                            <ProgressBar value={f.pct} label={f.label} />
                          </div>
                          <span className="text-xs font-mono text-text-tertiary w-10 text-right">{f.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
