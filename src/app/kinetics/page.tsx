"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { Divider } from "@/components/ui/divider";
import { DataTable } from "@/components/ui/table";
import { SimpleAreaChart, SimpleBarChart } from "@/components/charts/chart-wrapper";

/* ── Isothermal crystallization data: relative crystallinity vs time ── */
const isothermCurves = Array.from({ length: 40 }, (_, i) => {
  const t = i;
  return {
    time: t.toString(),
    "Tc=120°C": +(Math.min(1, 1 - Math.exp(-0.008 * Math.pow(t, 2.5))) * 100).toFixed(1),
    "Tc=125°C": +(Math.min(1, 1 - Math.exp(-0.003 * Math.pow(t, 2.5))) * 100).toFixed(1),
    "Tc=130°C": +(Math.min(1, 1 - Math.exp(-0.001 * Math.pow(t, 2.8))) * 100).toFixed(1),
  };
});

/* ── Growth rate bell curve (G vs Tc) ── */
const growthRateData = [
  { Tc: "100", G: 0.2 },
  { Tc: "105", G: 1.1 },
  { Tc: "110", G: 3.2 },
  { Tc: "115", G: 5.8 },
  { Tc: "120", G: 7.4 },
  { Tc: "125", G: 5.1 },
  { Tc: "130", G: 2.3 },
  { Tc: "135", G: 0.7 },
  { Tc: "140", G: 0.1 },
];

/* ── Avrami analysis results ── */
const avramiResults = [
  { id: "1", polymer: "HDPE", Tc: "120", n: "2.8", logK: "-2.10", halfTime: "9.2", regime: "II" },
  { id: "2", polymer: "HDPE", Tc: "125", n: "2.7", logK: "-2.52", halfTime: "15.8", regime: "II" },
  { id: "3", polymer: "HDPE", Tc: "130", n: "2.9", logK: "-3.00", halfTime: "28.1", regime: "II/III" },
  { id: "4", polymer: "iPP", Tc: "130", n: "2.5", logK: "-2.30", halfTime: "11.4", regime: "III" },
  { id: "5", polymer: "iPP", Tc: "135", n: "2.4", logK: "-3.09", halfTime: "32.0", regime: "II" },
  { id: "6", polymer: "PET", Tc: "200", n: "2.2", logK: "-1.82", halfTime: "6.8", regime: "II" },
];

export default function KineticsPage() {
  return (
    <MainLayout title="Kinetics" subtitle="Crystallization kinetics analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-slate-50 via-surface-0 to-indigo-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Crystallization Kinetics
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Isothermal and non-isothermal crystallization analysis. Fit Avrami parameters,
            measure half-times, and determine growth rates from DSC and PLM data.
          </p>
        </div>

        {/* Theory section */}
        <Card>
          <CardHeader>
            <CardTitle>Kinetic Framework</CardTitle>
            <CardDescription>
              How overall crystallization kinetics relates to nucleation and growth
            </CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <p className="text-sm text-text-secondary leading-relaxed">
              The overall crystallization rate depends on two processes: <strong>nucleation</strong> (formation of new
              crystal embryos) and <strong>growth</strong> (lateral and radial expansion of crystallites). At low
              undercooling, growth is fast but nucleation is slow. At high undercooling, nucleation is prolific
              but chain mobility limits growth. This produces a bell-shaped curve for G vs. Tc.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-2">Isothermal Crystallization</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Sample is rapidly cooled to a constant Tc and held. Relative crystallinity X(t) is obtained
                  by integrating the exothermic DSC peak over time. The resulting sigmoidal curve is fitted
                  with the Avrami equation to extract n and k.
                </p>
                <EquationBlock latex="X(t) = \frac{\int_0^t \frac{dH}{dt'}\,dt'}{\int_0^\infty \frac{dH}{dt'}\,dt'}" />
              </div>
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-2">Non-isothermal Crystallization</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Sample is cooled at constant rate ϕ. Relative crystallinity X(T) is obtained by integrating
                  the exotherm over temperature. Ozawa or Mo methods are used for analysis. The peak
                  temperature Tp shifts to lower T with increasing cooling rate.
                </p>
                <EquationBlock latex="X(T) = \frac{\int_{T_0}^{T} \frac{dH}{dT'}\,dT'}{\int_{T_0}^{T_\infty} \frac{dH}{dT'}\,dT'}" />
              </div>
            </div>
          </div>
        </Card>

        {/* Avrami Analysis */}
        <Tabs
          tabs={[
            {
              id: "conversion",
              label: "Conversion Curves",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Relative Crystallinity vs. Time — HDPE</CardTitle>
                    <CardDescription>
                      Sigmoidal curves shift right (slower) at higher Tc due to reduced undercooling.
                      Each curve is fitted independently with the Avrami equation.
                    </CardDescription>
                  </CardHeader>
                  <SimpleAreaChart data={isothermCurves} xKey="time" yKey="Tc=120°C" color="#1B3A6B" height={280} />
                  <p className="text-xs text-text-tertiary mt-3">
                    X-axis: time (min). Y-axis: X(t) (%). The inflection point ≈ t₁/₂.
                    At Tc = 120°C: t₁/₂ ≈ 9 min, n ≈ 2.8 (3D spherulitic growth, athermal nucleation).
                  </p>
                </Card>
              ),
            },
            {
              id: "growth",
              label: "Growth Rate",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Spherulite Growth Rate G vs. Tc</CardTitle>
                    <CardDescription>
                      Bell-shaped curve: competition between thermodynamic driving force (↑ at low Tc)
                      and chain mobility (↓ at low Tc). Maximum G occurs ~midway between Tg and Tm.
                    </CardDescription>
                  </CardHeader>
                  <SimpleBarChart data={growthRateData} xKey="Tc" yKey="G" color="#3B6298" height={280} />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-surface-1 rounded-sm p-3">
                      <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Peak Tc</div>
                      <div className="text-lg font-light text-text-primary mt-0.5">120°C</div>
                    </div>
                    <div className="bg-surface-1 rounded-sm p-3">
                      <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Max G</div>
                      <div className="text-lg font-light text-text-primary mt-0.5">7.4 μm/min</div>
                    </div>
                    <div className="bg-surface-1 rounded-sm p-3">
                      <div className="text-[10px] uppercase tracking-wider text-text-tertiary">Method</div>
                      <div className="text-lg font-light text-text-primary mt-0.5">PLM</div>
                    </div>
                  </div>
                </Card>
              ),
            },
            {
              id: "avrami",
              label: "Avrami Plot",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Avrami Analysis</CardTitle>
                    <CardDescription>
                      Linearized Avrami plot: ln[−ln(1−X)] vs ln(t). Slope = n, intercept = ln(k).
                    </CardDescription>
                  </CardHeader>

                  <EquationBlock latex="\ln\!\left[-\ln\!\left(1 - X(t)\right)\right] = \ln k + n \ln t" />

                  <p className="text-sm text-text-secondary leading-relaxed mt-3 mb-4">
                    The linearity of this plot in the range X = 0.03 to 0.80 confirms Avrami-type kinetics.
                    Deviations above X ≈ 0.80 are typical and indicate secondary crystallization
                    (lamellar thickening, infilling of inter-spherulitic regions).
                  </p>

                  <Divider className="my-4" />

                  <h4 className="text-sm font-medium text-text-primary mb-3">Fitted Parameters</h4>
                  <DataTable
                    columns={[
                      { key: "polymer", header: "Polymer" },
                      { key: "Tc", header: "Tc (°C)", numeric: true },
                      { key: "n", header: "n", numeric: true },
                      { key: "logK", header: "log(k)" },
                      { key: "halfTime", header: "t₁/₂ (min)", numeric: true },
                      {
                        key: "regime",
                        header: "Regime",
                        render: (row) => (
                          <Badge variant={row.regime === "II" ? "indigo" : row.regime === "III" ? "sand" : "slate"}>
                            {row.regime as string}
                          </Badge>
                        ),
                      },
                    ]}
                    data={avramiResults}
                  />

                  <div className="bg-surface-1 rounded-md p-4 mt-4">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <strong>Interpretation:</strong> n ≈ 2.5–3.0 is consistent with 3D spherulitic growth from
                      pre-existing (athermal) nuclei. The increase in t₁/₂ with Tc confirms that crystallization
                      slows as undercooling decreases. The k values decrease by roughly one order of magnitude per
                      5°C increase in Tc.
                    </p>
                  </div>
                </Card>
              ),
            },
          ]}
        />

        {/* Equations reference */}
        <Card>
          <CardHeader>
            <CardTitle>Key Kinetic Equations</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-text-primary mb-2">Overall Crystallization Rate</p>
              <EquationBlock latex="G_{\text{overall}} \propto I^{1/(d+1)} \cdot G^{d/(d+1)}" />
              <p className="text-xs text-text-tertiary mt-1">
                d = dimensionality of growth (1, 2, or 3). I = nucleation rate, G = linear growth rate.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary mb-2">Crystallization Rate Constant</p>
              <EquationBlock latex="k = \frac{f}{n} \cdot N_0 \cdot G^n" />
              <p className="text-xs text-text-tertiary mt-1">
                f = shape factor (4π/3 for spheres), N₀ = nucleation density (for athermal),
                G = linear growth rate.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
