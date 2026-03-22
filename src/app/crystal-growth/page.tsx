"use client";

import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { Divider } from "@/components/ui/divider";
import { SimpleAreaChart, SimpleBarChart } from "@/components/charts/chart-wrapper";

/* ── Spherulite radius vs time (isothermal growth, constant G) ── */
const growthData = Array.from({ length: 30 }, (_, i) => ({
  time: i.toString(),
  "Tc=120°C": +(4.2 * i).toFixed(1),
  "Tc=125°C": +(2.8 * i).toFixed(1),
  "Tc=130°C": +(1.5 * i).toFixed(1),
}));

/* ── Growth rate G vs Tc (bell curve) ── */
const growthRateBell = [
  { Tc: "95", G: 0.1 },
  { Tc: "100", G: 0.8 },
  { Tc: "105", G: 2.4 },
  { Tc: "110", G: 4.5 },
  { Tc: "115", G: 6.8 },
  { Tc: "120", G: 7.6 },
  { Tc: "125", G: 5.2 },
  { Tc: "130", G: 2.8 },
  { Tc: "135", G: 0.9 },
  { Tc: "140", G: 0.15 },
];

/* ── Nucleation density vs Tc ── */
const nucleationData = [
  { Tc: "115", N: 1.2 },
  { Tc: "120", N: 3.8 },
  { Tc: "125", N: 8.5 },
  { Tc: "130", N: 15.2 },
  { Tc: "135", N: 28.0 },
  { Tc: "140", N: 42.0 },
];

export default function CrystalGrowthPage() {
  return (
    <MainLayout title="Crystal Growth" subtitle="Morphology & PLOM analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-slate-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Crystal Growth & Morphology
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Spherulitic growth observed by Polarized Light Optical Microscopy (PLOM).
            Measure radial growth rates, nucleation densities, and study morphological
            features including Maltese cross patterns, banding, and impingement boundaries.
          </p>
        </div>

        {/* PLOM Images section */}
        <Card>
          <CardHeader>
            <CardTitle>PLOM — Polarized Light Optical Microscopy</CardTitle>
            <CardDescription>
              Under crossed polarizers, birefringent spherulites appear bright against a dark
              (isotropic) amorphous background. The characteristic Maltese cross extinction pattern
              arises from radial symmetry of the lamellar orientation.
            </CardDescription>
          </CardHeader>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="relative aspect-square rounded-md overflow-hidden border border-border-soft bg-[#0a0a14]">
                <Image
                  src="/plom/spherulite-single.svg"
                  alt="Single spherulite under crossed polars showing Maltese cross extinction pattern"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-text-primary">Single Spherulite</p>
                <p className="text-[10px] text-text-tertiary">
                  Maltese cross from radial lamellar symmetry. Dark arms align with
                  polarizer/analyzer axes.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative aspect-square rounded-md overflow-hidden border border-border-soft bg-[#0a0a14]">
                <Image
                  src="/plom/spherulites-impingement.svg"
                  alt="Multiple spherulites showing impingement boundaries"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-text-primary">Impingement</p>
                <p className="text-[10px] text-text-tertiary">
                  Spherulites grow until boundaries meet. Final morphology fills
                  volume completely.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative aspect-[4/1] rounded-md overflow-hidden border border-border-soft bg-[#0a0a14] row-span-1">
                <Image
                  src="/plom/growth-sequence.svg"
                  alt="Time-lapse sequence of spherulite growth from nucleus to full size"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-text-primary">Growth Sequence</p>
                <p className="text-[10px] text-text-tertiary">
                  Time-lapse: nucleus → growing spherulite. Radius increases linearly
                  at constant Tc.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-1 rounded-md p-4 mt-4">
            <h4 className="text-xs font-medium text-text-primary mb-2">About PLOM in Crystallization Studies</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              PLOM is the primary technique for directly observing spherulitic morphology and measuring
              radial growth rates G (μm/min). A hot stage controls the sample temperature for isothermal
              crystallization experiments. Images are captured at regular intervals, and spherulite radii
              are measured from the micrographs. The slope of radius vs. time gives G directly.
              Under crossed polars, amorphous regions appear dark (isotropic), while crystalline regions
              are bright (birefringent). The Maltese cross is a signature of radial symmetry — the dark
              arms correspond to lamellar orientations parallel to the polarizer or analyzer.
            </p>
          </div>
        </Card>

        {/* Growth kinetics tabs */}
        <Tabs
          tabs={[
            {
              id: "radial",
              label: "Radial Growth",
              content: (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spherulite Radius vs. Time</CardTitle>
                      <CardDescription>
                        At constant Tc, the radius increases linearly with time (constant growth rate G).
                        The slope R/t = G. Higher undercooling = faster growth (up to the maximum).
                      </CardDescription>
                    </CardHeader>
                    <SimpleAreaChart
                      data={growthData}
                      xKey="time"
                      yKey="Tc=120°C"
                      color="#1B3A6B"
                      height={280}
                    />
                    <p className="text-xs text-text-tertiary mt-2">
                      X-axis: time (min). Y-axis: spherulite radius (μm).
                      At Tc = 120°C: G = 4.2 μm/min. At Tc = 130°C: G = 1.5 μm/min.
                    </p>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Growth Rate Equation</CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        The radial growth rate G is constant at a given isothermal Tc. It is measured as:
                      </p>
                      <EquationBlock latex="G = \frac{dR}{dt} = \text{const at fixed } T_c" />
                      <p className="text-xs text-text-secondary leading-relaxed">
                        G depends on temperature through the Hoffman-Lauritzen equation, which balances
                        the thermodynamic driving force (undercooling) against chain mobility:
                      </p>
                      <EquationBlock latex="G = G_0 \exp\!\left(\frac{-U^*}{R(T_c - T_\infty)}\right) \exp\!\left(\frac{-K_g}{T_c \, \Delta T \, f}\right)" />
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              id: "bell",
              label: "G vs Temperature",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Rate Bell Curve — HDPE</CardTitle>
                    <CardDescription>
                      Competition between thermodynamic driving force (favors low Tc) and chain
                      mobility (favors high Tc) produces a maximum growth rate at an intermediate Tc.
                    </CardDescription>
                  </CardHeader>
                  <SimpleBarChart data={growthRateBell} xKey="Tc" yKey="G" color="#1B3A6B" height={280} />

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-surface-1 rounded-md p-4">
                      <h5 className="text-xs font-medium text-text-primary mb-1">Low Tc (high ΔT)</h5>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        High thermodynamic driving force but chain mobility is low.
                        Growth is limited by diffusion. Many small nuclei, many small
                        imperfect spherulites.
                      </p>
                    </div>
                    <div className="bg-surface-1 rounded-md p-4">
                      <h5 className="text-xs font-medium text-text-primary mb-1">Optimal Tc</h5>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Maximum G at ~120°C for HDPE. Balance of driving force and
                        chain mobility. Best conditions for growing large, well-formed
                        spherulites for PLOM measurement.
                      </p>
                    </div>
                    <div className="bg-surface-1 rounded-md p-4">
                      <h5 className="text-xs font-medium text-text-primary mb-1">High Tc (low ΔT)</h5>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        High chain mobility but low thermodynamic driving force.
                        Very few nuclei form, growth is slow. Produces very large
                        but few spherulites (if any).
                      </p>
                    </div>
                  </div>
                </Card>
              ),
            },
            {
              id: "nucleation",
              label: "Nucleation Density",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Nucleation Density vs. Tc</CardTitle>
                    <CardDescription>
                      Number of nuclei per unit area (N/mm²) counted from PLOM images.
                      Nucleation density increases sharply with decreasing Tc (increasing undercooling).
                    </CardDescription>
                  </CardHeader>
                  <SimpleBarChart data={nucleationData} xKey="Tc" yKey="N" color="#3B6298" height={260} />

                  <Divider className="my-4" />

                  <div className="space-y-3">
                    <h4 className="text-xs font-medium text-text-primary">Nucleation Types Observed in PLOM</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-surface-1 rounded-md p-4">
                        <Badge variant="indigo" className="mb-2">Athermal (predetermined)</Badge>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          All nuclei appear immediately upon reaching Tc. Number is fixed from the start.
                          Commonly seen with heterogeneous nucleating agents. Avrami n = d (no +1).
                        </p>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <Badge variant="sand" className="mb-2">Thermal (sporadic)</Badge>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Nuclei appear continuously during crystallization. Number increases with time.
                          Seen in homogeneous nucleation at high undercooling. Avrami n = d + 1.
                        </p>
                      </div>
                    </div>

                    <EquationBlock latex="N = N_0 \exp\!\left(\frac{-\Delta G^*}{k_B T}\right)" />
                    <p className="text-xs text-text-tertiary">
                      For thermal nucleation, the nucleation rate I (nuclei/volume/time) depends
                      exponentially on the free energy barrier ΔG*, which decreases with increasing undercooling.
                    </p>
                  </div>
                </Card>
              ),
            },
            {
              id: "morphology",
              label: "Morphological Features",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Spherulite Morphology under PLOM</CardTitle>
                    <CardDescription>
                      Key features observable in polarized light optical micrographs
                    </CardDescription>
                  </CardHeader>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">Maltese Cross</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Dark cross-shaped extinction pattern observed under crossed polars. Arms are
                          parallel to polarizer/analyzer axes. Results from radial arrangement of lamellae
                          in the spherulite — at 0° and 90° to the polarizer, the crystal optic axis
                          produces extinction.
                        </p>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">Banding (Ring Pattern)</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Concentric rings of alternating bright/dark in some polymers (e.g., PVDF, PHB).
                          Caused by periodic lamellar twisting along the radial growth direction.
                          Band spacing depends on Tc and can range from 1 to 20+ μm.
                        </p>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">Impingement Boundaries</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Straight or curved lines where growing spherulites meet. The final solid is
                          completely space-filling — all amorphous material is either within spherulites
                          (inter-lamellar) or at boundaries. Boundary geometry follows Voronoi tessellation.
                        </p>
                      </div>
                      <div className="bg-surface-1 rounded-md p-4">
                        <h5 className="text-xs font-medium text-text-primary mb-1">Negative vs Positive Spherulites</h5>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          Determined by the sign of birefringence (Δn = n_radial − n_tangential).
                          Positive: n_radial {">"} n_tangential (PE). Negative: n_radial {"<"} n_tangential (iPP α-form).
                          Distinguished using a first-order red plate (λ-plate) in PLOM.
                        </p>
                      </div>
                    </div>

                    <Divider />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Measurement Protocol (PLOM + Hot Stage)</h4>
                      <ol className="text-xs text-text-secondary leading-relaxed space-y-1 list-decimal pl-5">
                        <li>Mount thin film (5–20 μm) on glass slide with coverslip</li>
                        <li>Set hot stage to Tm + 30°C, hold 5 min to erase thermal history</li>
                        <li>Cool rapidly (≥ 50°C/min) to target isothermal Tc</li>
                        <li>Capture PLOM images at regular intervals (every 30–60 s)</li>
                        <li>Measure spherulite radii from each frame using image analysis</li>
                        <li>Plot R vs t — slope = G (μm/min)</li>
                        <li>Count nuclei at t → 0 for nucleation density N (nuclei/mm²)</li>
                      </ol>
                    </div>
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
