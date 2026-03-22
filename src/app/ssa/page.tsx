"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { Divider } from "@/components/ui/divider";
import { SimpleAreaChart } from "@/components/charts/chart-wrapper";
import { ProgressBar } from "@/components/ui/progress-bar";

/* ── Experimental-style SSA final heating scan ── */
/* Mimics real DSC data: baseline drift, noise, multiple overlapping endotherms */
function generateExperimentalSSACurve() {
  const points = [];
  for (let i = 0; i <= 200; i++) {
    const T = 60 + i * 0.5;
    /* baseline drift (real DSC curves drift slightly) */
    const baseline = 0.15 + T * 0.001;
    /* noise */
    const noise = (Math.sin(i * 7.3) * 0.03 + Math.sin(i * 13.1) * 0.02);
    /* SSA fractions — 6 overlapping endothermic peaks with asymmetry */
    const peaks = [
      { Tm: 102, h: 1.2, wL: 4, wR: 3 },  // fraction 1 (thinnest lamellae)
      { Tm: 110, h: 2.8, wL: 3.5, wR: 3 },
      { Tm: 117, h: 5.5, wL: 3, wR: 2.8 },
      { Tm: 123, h: 8.2, wL: 2.8, wR: 2.5 }, // dominant fraction
      { Tm: 128, h: 4.5, wL: 2.5, wR: 2.2 },
      { Tm: 133, h: 1.8, wL: 2.2, wR: 2.0 },  // fraction 6 (thickest)
    ];
    let hf = 0;
    for (const p of peaks) {
      const w = T < p.Tm ? p.wL : p.wR;
      hf += p.h * Math.exp(-((T - p.Tm) ** 2) / (2 * w * w));
    }
    points.push({
      temp: T.toFixed(1),
      heatFlow: +((hf + baseline + noise) * -1).toFixed(3), // endothermic = negative convention
    });
  }
  return points;
}

/* ── Standard DSC single heating (for comparison) ── */
function generateStandardDSCCurve() {
  const points = [];
  for (let i = 0; i <= 200; i++) {
    const T = 60 + i * 0.5;
    const baseline = 0.15 + T * 0.001;
    const noise = Math.sin(i * 5.7) * 0.02;
    /* Single broad melting peak */
    const wL = 12;
    const wR = 6;
    const w = T < 125 ? wL : wR;
    const peak = 9.5 * Math.exp(-((T - 125) ** 2) / (2 * w * w));
    points.push({
      temp: T.toFixed(1),
      heatFlow: +((peak + baseline + noise) * -1).toFixed(3),
    });
  }
  return points;
}

/* ── SSA thermal protocol: T vs time profile ── */
function generateSSAProtocol() {
  const points: { time: string; temperature: number }[] = [];
  let t = 0;
  const rate = 10; // °C/min
  const holdTime = 5; // min

  const addSegment = (Tstart: number, Tend: number) => {
    const duration = Math.abs(Tend - Tstart) / rate;
    const steps = Math.max(2, Math.round(duration * 2));
    for (let i = 0; i <= steps; i++) {
      const T = Tstart + (Tend - Tstart) * (i / steps);
      points.push({ time: (t + (duration * i) / steps).toFixed(1), temperature: +T.toFixed(1) });
    }
    t += duration;
  };

  const addHold = (T: number, dur: number) => {
    points.push({ time: t.toFixed(1), temperature: T });
    t += dur;
    points.push({ time: t.toFixed(1), temperature: T });
  };

  /* Step 1: Erase thermal history — heat to 200°C */
  addSegment(25, 200);
  addHold(200, 5);

  /* Step 2: Cool to 25°C */
  addSegment(200, 25);
  addHold(25, 1);

  /* Step 3–7: SSA cycles at decreasing Ts */
  const tsTemps = [140, 135, 130, 125, 120];
  for (const ts of tsTemps) {
    addSegment(25, ts);     // heat to Ts
    addHold(ts, holdTime);  // anneal at Ts
    addSegment(ts, 25);     // cool to base
    addHold(25, 1);         // brief hold
  }

  /* Step 8: Final heating scan */
  addSegment(25, 160);

  return points;
}

const ssaCurve = generateExperimentalSSACurve();
const standardCurve = generateStandardDSCCurve();
const protocolCurve = generateSSAProtocol();

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
              label: "Thermal Protocol",
              content: (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>SSA Temperature Program</CardTitle>
                      <CardDescription>
                        Temperature vs. time profile showing all heating/cooling/annealing cycles.
                        Each sawtooth represents one SSA fractionation step at decreasing Ts.
                      </CardDescription>
                    </CardHeader>
                    <SimpleAreaChart
                      data={protocolCurve}
                      xKey="time"
                      yKey="temperature"
                      color="#1B3A6B"
                      height={300}
                    />
                    <p className="text-xs text-text-tertiary mt-2">
                      X-axis: time (min). Y-axis: temperature (°C). Heating/cooling rate: 10°C/min.
                      Hold at each Ts for 5 min. Five SSA cycles at Ts = 140, 135, 130, 125, 120°C.
                    </p>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Protocol Steps</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                      {[
                        {
                          step: "1. Erase thermal history",
                          desc: "Heat to Tm + 20–30°C (200°C for PE) and hold 3–5 min. Completely melts all crystals.",
                          badge: "Preparation",
                          color: "slate" as const,
                        },
                        {
                          step: "2. Standard crystallization",
                          desc: "Cool at 10°C/min to 25°C. Creates the initial crystal population with broad thickness distribution.",
                          badge: "Cooling",
                          color: "slate" as const,
                        },
                        {
                          step: "3. Determine self-nucleation Ts",
                          desc: "Heat to temperatures near Tm to find the ideal self-nucleation domain (Domain II). Ts too high = full melt. Ts too low = annealing only.",
                          badge: "Calibration",
                          color: "indigo" as const,
                        },
                        {
                          step: "4. First SSA cycle (Ts = 140°C)",
                          desc: "Heat to highest Ts, hold 5 min (anneals thickest surviving crystals), then cool to 25°C.",
                          badge: "Cycle 1",
                          color: "sage" as const,
                        },
                        {
                          step: "5. Repeat at Ts − ΔTs (5°C steps)",
                          desc: "Heat to 135°C, 130°C, 125°C, 120°C successively. Each cycle isolates and perfects a thinner crystal population.",
                          badge: "Cycles 2–5",
                          color: "sage" as const,
                        },
                        {
                          step: "6. Final heating scan",
                          desc: "Heat at 10°C/min to above Tm. The DSC curve now shows distinct endothermic peaks — each from one fractionated crystal population.",
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
                        A preliminary Ts scan is essential before running the full SSA protocol.
                      </p>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              id: "results",
              label: "Experimental Results",
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Standard DSC — Single Heating</CardTitle>
                        <CardDescription>
                          Broad melting endotherm. Crystal population distribution is hidden within
                          the single peak envelope. Endo down convention.
                        </CardDescription>
                      </CardHeader>
                      <SimpleAreaChart data={standardCurve} xKey="temp" yKey="heatFlow" color="#3B6298" height={220} />
                      <p className="text-xs text-text-tertiary mt-2">
                        T (°C) vs Heat Flow (W/g). Single Tm ≈ 125°C for LLDPE.
                      </p>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>After SSA — Final Heating Scan</CardTitle>
                        <CardDescription>
                          6 resolved endothermic peaks. Each peak = one crystal population with
                          distinct lamellar thickness and methylene sequence length.
                        </CardDescription>
                      </CardHeader>
                      <SimpleAreaChart data={ssaCurve} xKey="temp" yKey="heatFlow" color="#1B3A6B" height={220} />
                      <p className="text-xs text-text-tertiary mt-2">
                        T (°C) vs Heat Flow (W/g). Peaks at 102, 110, 117, 123, 128, 133°C.
                      </p>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Fraction Analysis — LLDPE (Ziegler-Natta)</CardTitle>
                      <CardDescription>
                        Each SSA peak area is proportional to the mass fraction. Lamellar thickness
                        and methylene sequence length calculated via Thomson-Gibbs equation.
                      </CardDescription>
                    </CardHeader>
                    <div className="space-y-3">
                      {[
                        { label: "Fraction 6 (thickest)", Tm: "133°C", l: "24.0 nm", n: "189", area: "7.2 J/g", pct: 8 },
                        { label: "Fraction 5", Tm: "128°C", l: "17.8 nm", n: "140", area: "18.1 J/g", pct: 18 },
                        { label: "Fraction 4 (dominant)", Tm: "123°C", l: "13.8 nm", n: "109", area: "33.0 J/g", pct: 33 },
                        { label: "Fraction 3", Tm: "117°C", l: "10.5 nm", n: "83", area: "22.1 J/g", pct: 22 },
                        { label: "Fraction 2", Tm: "110°C", l: "8.1 nm", n: "64", area: "11.3 J/g", pct: 12 },
                        { label: "Fraction 1 (thinnest)", Tm: "102°C", l: "6.5 nm", n: "51", area: "7.0 J/g", pct: 7 },
                      ].map((f) => (
                        <div key={f.label} className="flex items-center gap-4">
                          <span className="text-xs text-text-primary w-44 shrink-0">{f.label}</span>
                          <span className="text-xs font-mono text-text-secondary w-16 shrink-0">Tm={f.Tm}</span>
                          <span className="text-xs font-mono text-text-secondary w-20 shrink-0">l={f.l}</span>
                          <span className="text-xs font-mono text-text-secondary w-14 shrink-0">n≈{f.n}</span>
                          <span className="text-xs font-mono text-text-secondary w-20 shrink-0">ΔH={f.area}</span>
                          <div className="flex-1">
                            <ProgressBar value={f.pct} label={f.label} />
                          </div>
                          <span className="text-xs font-mono text-text-tertiary w-10 text-right shrink-0">{f.pct}%</span>
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
