"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { DataTable } from "@/components/ui/table";
import { SimpleAreaChart, SimpleBarChart } from "@/components/charts/chart-wrapper";

/* Isothermal crystallization curves */
const isothermData = Array.from({ length: 30 }, (_, i) => {
  const t = i * 2;
  return {
    time: t.toString(),
    "130°C": Math.min(1, 1 - Math.exp(-0.001 * Math.pow(t, 2.8))) * 100,
    "125°C": Math.min(1, 1 - Math.exp(-0.003 * Math.pow(t, 2.5))) * 100,
    "120°C": Math.min(1, 1 - Math.exp(-0.008 * Math.pow(t, 2.2))) * 100,
  };
});

/* Growth rate vs temperature */
const growthRateData = [
  { temp: "110", rate: 0.8 },
  { temp: "115", rate: 2.1 },
  { temp: "120", rate: 4.5 },
  { temp: "125", rate: 3.8 },
  { temp: "130", rate: 2.2 },
  { temp: "135", rate: 0.9 },
  { temp: "140", rate: 0.3 },
];

/* Avrami parameters for different polymers */
const avramiData = [
  { id: "1", polymer: "HDPE", n: "2.8", k: "3.2×10⁻³", halfTime: "12.4", regime: "II" },
  { id: "2", polymer: "iPP", n: "2.5", k: "8.1×10⁻⁴", halfTime: "28.6", regime: "III" },
  { id: "3", polymer: "PET", n: "2.2", k: "1.5×10⁻²", halfTime: "8.1", regime: "II" },
  { id: "4", polymer: "PLA", n: "3.1", k: "5.7×10⁻⁴", halfTime: "35.2", regime: "III" },
  { id: "5", polymer: "PEEK", n: "2.6", k: "2.3×10⁻³", halfTime: "18.9", regime: "II" },
];

export default function KineticsPage() {
  return (
    <MainLayout title="Kinetics" subtitle="Crystallization kinetics analysis">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Active Fits" value="3" subtext="Avrami models" />
          <MetricCard label="Avg. Exponent" value="2.6" subtext="across all polymers" />
          <MetricCard label="Fastest t₁/₂" value="8.1 min" subtext="PET @ 120°C" />
          <MetricCard label="Data Points" value="2,340" subtext="total collected" />
        </div>

        {/* Charts */}
        <Tabs
          tabs={[
            {
              id: "isothermal",
              label: "Isothermal Curves",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Relative Crystallinity vs Time</CardTitle>
                    <CardDescription>Sigmoidal conversion curves at different isothermal temperatures (HDPE)</CardDescription>
                  </CardHeader>
                  <SimpleAreaChart data={isothermData} xKey="time" yKey="120°C" color="#2EB5AD" height={280} />
                </Card>
              ),
            },
            {
              id: "growth",
              label: "Growth Rate",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Spherulite Growth Rate</CardTitle>
                    <CardDescription>G (μm/min) vs crystallization temperature — bell-shaped curve</CardDescription>
                  </CardHeader>
                  <SimpleBarChart data={growthRateData} xKey="temp" yKey="rate" color="#82A876" height={280} />
                </Card>
              ),
            },
          ]}
        />

        {/* Equations */}
        <Card>
          <CardHeader>
            <CardTitle>Kinetic Models</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-text-primary mb-2">Avrami Equation</p>
              <EquationBlock latex="X(t) = 1 - \exp(-k\,t^n)" />
              <p className="text-xs text-text-tertiary mt-2">
                n ≈ 2: disk-like growth; n ≈ 3: spherulitic growth; n ≈ 4: sporadic nucleation + 3D growth
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary mb-2">Half-time of Crystallization</p>
              <EquationBlock latex="t_{1/2} = \left(\frac{\ln 2}{k}\right)^{1/n}" />
              <p className="text-xs text-text-tertiary mt-2">
                Convenient single-parameter measure of overall crystallization rate.
              </p>
            </div>
          </div>
        </Card>

        {/* Avrami parameter table */}
        <Card>
          <CardHeader>
            <CardTitle>Avrami Parameters</CardTitle>
            <CardDescription>Fitted values from isothermal DSC experiments</CardDescription>
          </CardHeader>
          <DataTable
            columns={[
              { key: "polymer", header: "Polymer" },
              { key: "n", header: "n (exponent)", numeric: true },
              { key: "k", header: "k (rate const.)" },
              { key: "halfTime", header: "t₁/₂ (min)", numeric: true },
              {
                key: "regime",
                header: "Regime",
                render: (row) => (
                  <Badge variant={row.regime === "II" ? "indigo" : "sand"}>
                    Regime {row.regime as string}
                  </Badge>
                ),
              },
            ]}
            data={avramiData}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
