"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, FeatureCard, MetricCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { UploadZone } from "@/components/ui/upload-zone";
import { EquationBlock } from "@/components/ui/equation-block";
import { Skeleton } from "@/components/ui/skeleton";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip } from "@/components/ui/tooltip";
import { Alert } from "@/components/ui/alert";
import { Toggle } from "@/components/ui/toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Divider } from "@/components/ui/divider";
import { fadeUp, stagger } from "@/lib/motion";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from "lucide-react";

const SimpleAreaChart = dynamic(
  () => import("@/components/charts/chart-wrapper").then((m) => m.SimpleAreaChart),
  { ssr: false }
);

const SimpleBarChart = dynamic(
  () => import("@/components/charts/chart-wrapper").then((m) => m.SimpleBarChart),
  { ssr: false }
);

/* ── Color palette data ── */
const colorRamps = [
  { name: "Indigo", prefix: "indigo", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Sage", prefix: "sage", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Rose", prefix: "rose", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Sand", prefix: "sand", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Slate", prefix: "slate", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Teal", prefix: "teal", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Lavender", prefix: "lav", stops: [50, 100, 200, 400, 600, 800] },
];

const colorMap: Record<string, string> = {
  "indigo-50": "#F0F0FF", "indigo-100": "#E0E0FD", "indigo-200": "#C4C4F7",
  "indigo-400": "#8B8EE8", "indigo-600": "#5254A3", "indigo-800": "#333580",
  "sage-50": "#F2F6F1", "sage-100": "#E2EDE0", "sage-200": "#C4DABC",
  "sage-400": "#82A876", "sage-600": "#4F7A44", "sage-800": "#2E4D27",
  "rose-50": "#FDF2F4", "rose-100": "#F9E2E6", "rose-200": "#F0C2CB",
  "rose-400": "#D8829A", "rose-600": "#A3506A", "rose-800": "#6B2E42",
  "sand-50": "#FAF7F0", "sand-100": "#F5EDD9", "sand-200": "#EAD4A8",
  "sand-400": "#C9A05A", "sand-600": "#957035", "sand-800": "#604618",
  "slate-50": "#F0F2F8", "slate-100": "#DEE3F2", "slate-200": "#BFCAE6",
  "slate-400": "#7D94CE", "slate-600": "#4A6BAD", "slate-800": "#2A4478",
  "teal-50": "#F0F7F5", "teal-100": "#DAEEE9", "teal-200": "#AFDBD2",
  "teal-400": "#62B5A8", "teal-600": "#377D73", "teal-800": "#1C4E47",
  "lav-50": "#F5F2FB", "lav-100": "#EAE3F7", "lav-200": "#D2C5F0",
  "lav-400": "#A48DD8", "lav-600": "#7258B0", "lav-800": "#483574",
};

/* ── Sample table data ── */
const tableColumns = [
  { key: "polymer", header: "Polymer" },
  { key: "method", header: "Method" },
  { key: "tm", header: "Tm (C)", numeric: true as const },
  { key: "tc", header: "Tc (C)", numeric: true as const },
  { key: "crystallinity", header: "Xc (%)", numeric: true as const },
];

const tableData = [
  { polymer: "Polyethylene (HDPE)", method: "DSC", tm: "134.2", tc: "118.5", crystallinity: "72.4" },
  { polymer: "Polypropylene (iPP)", method: "WAXS", tm: "165.8", tc: "112.3", crystallinity: "58.1" },
  { polymer: "PLA", method: "DSC", tm: "170.5", tc: "98.7", crystallinity: "42.3" },
  { polymer: "PET", method: "SAXS", tm: "256.3", tc: "195.2", crystallinity: "35.6" },
  { polymer: "PCL", method: "DSC", tm: "60.1", tc: "32.4", crystallinity: "55.8" },
];

/* ── Sample chart data ── */
const areaChartData = [
  { time: "0", crystallinity: 0 },
  { time: "5", crystallinity: 8 },
  { time: "10", crystallinity: 22 },
  { time: "15", crystallinity: 41 },
  { time: "20", crystallinity: 58 },
  { time: "25", crystallinity: 67 },
  { time: "30", crystallinity: 71 },
  { time: "35", crystallinity: 72 },
  { time: "40", crystallinity: 72.4 },
];

const barChartData = [
  { polymer: "HDPE", xc: 72.4 },
  { polymer: "iPP", xc: 58.1 },
  { polymer: "PCL", xc: 55.8 },
  { polymer: "PLA", xc: 42.3 },
  { polymer: "PET", xc: 35.6 },
  { polymer: "PEEK", xc: 28.2 },
];

/* ── Section header component ── */
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12 first:mt-0">
      <div className="w-0.5 h-5 bg-indigo-400 rounded-full" />
      <h2 className="text-xl font-medium text-text-primary">{title}</h2>
    </div>
  );
}

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <MainLayout title="Design System Showcase" subtitle="PolymerCryst v0.1">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* ── Color Palette ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Color Palette" />
            <div className="space-y-4">
              {colorRamps.map((ramp) => (
                <div key={ramp.name}>
                  <p className="text-xs font-medium text-text-secondary mb-2">{ramp.name}</p>
                  <div className="flex gap-2">
                    {ramp.stops.map((stop) => {
                      const key = `${ramp.prefix}-${stop}`;
                      return (
                        <div key={stop} className="flex flex-col items-center gap-1">
                          <div
                            className="w-12 h-12 rounded-sm border border-border-soft"
                            style={{ backgroundColor: colorMap[key] }}
                          />
                          <span className="text-[10px] text-text-tertiary font-mono">{stop}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Typography ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Typography" />
            <Card>
              <div className="space-y-3">
                <p className="text-3xl font-medium text-text-primary">3xl — 30px heading</p>
                <p className="text-2xl font-medium text-text-primary">2xl — 24px heading</p>
                <p className="text-xl font-medium text-text-primary">xl — 20px heading</p>
                <p className="text-lg text-text-primary">lg — 17px body large</p>
                <p className="text-base text-text-primary">base — 15px body</p>
                <p className="text-sm text-text-secondary">sm — 13px caption</p>
                <p className="text-xs text-text-tertiary">xs — 11px meta</p>
                <p className="text-sm font-mono text-text-primary">Monospace — JetBrains Mono 13px</p>
              </div>
            </Card>
          </motion.div>

          {/* ── Buttons ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Buttons" />
            <Card>
              <p className="text-xs font-medium text-text-secondary mb-3">Variants</p>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="primary" disabled>Disabled</Button>
              </div>
              <p className="text-xs font-medium text-text-secondary mb-3">Sizes</p>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              <p className="text-xs font-medium text-text-secondary mb-3">Loading</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" loading>Processing</Button>
                <Button variant="secondary" loading>Loading</Button>
              </div>
            </Card>
          </motion.div>

          {/* ── Cards ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Cards" />
            <div className="grid grid-cols-3 gap-4">
              <Card interactive>
                <p className="text-sm font-medium text-text-primary mb-1">Interactive Card</p>
                <p className="text-xs text-text-secondary">Hover to see the lift effect with spring easing.</p>
              </Card>
              <FeatureCard>
                <p className="text-sm font-medium text-text-primary mb-1">Feature Card</p>
                <p className="text-xs text-text-secondary">Enhanced top highlight for hero sections.</p>
              </FeatureCard>
              <Card>
                <p className="text-sm font-medium text-text-primary mb-1">Standard Card</p>
                <p className="text-xs text-text-secondary">Default card with subtle shadow and border.</p>
              </Card>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <MetricCard label="Crystallinity" value="72.4%" subtext="Xc via DSC" />
              <MetricCard label="Melting Point" value="134.2" subtext="Tm (C)" />
              <MetricCard label="Samples" value="1,247" subtext="in database" />
              <MetricCard label="Lamellar" value="12.3" subtext="nm (SAXS)" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-text-secondary mb-3">Structured Card</p>
              <Card className="p-0">
                <CardHeader>
                  <CardTitle>DSC Analysis Results</CardTitle>
                  <CardDescription>Isothermal crystallization of HDPE at 120°C</CardDescription>
                </CardHeader>
                <CardContent className="px-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[11px] text-text-tertiary uppercase tracking-wide">Tm</p>
                      <p className="text-lg font-medium text-text-primary">134.2°C</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-tertiary uppercase tracking-wide">Tc</p>
                      <p className="text-lg font-medium text-text-primary">118.5°C</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-tertiary uppercase tracking-wide">Xc</p>
                      <p className="text-lg font-medium text-text-primary">72.4%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" size="sm">Export</Button>
                  <Button variant="primary" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>

          {/* ── Form Inputs ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Form Controls" />
            <Card>
              <div className="grid grid-cols-3 gap-4">
                <Input label="Polymer Name" placeholder="e.g. Polyethylene" helperText="Common or IUPAC name" />
                <Input label="Molecular Weight" placeholder="Mw (g/mol)" type="number" />
                <Select
                  label="Characterization Method"
                  options={[
                    { value: "dsc", label: "DSC" },
                    { value: "saxs", label: "SAXS" },
                    { value: "waxs", label: "WAXS" },
                    { value: "plm", label: "PLM" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <Input label="Temperature" placeholder="e.g. 25" type="number" error="Temperature must be between -273 and 1000" />
                <Input label="Heating Rate" placeholder="K/min" disabled />
              </div>
              <div className="mt-4">
                <Textarea
                  label="Notes"
                  placeholder="Describe sample preparation, experimental conditions..."
                  rows={3}
                />
              </div>
            </Card>
          </motion.div>

          {/* ── Badges ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Badges & Tags" />
            <Card>
              <div className="flex flex-wrap gap-2">
                <Badge variant="indigo">Primary</Badge>
                <Badge variant="sage">Biopolymers</Badge>
                <Badge variant="rose">Mechanics</Badge>
                <Badge variant="sand">SAXS/WAXS</Badge>
                <Badge variant="slate">Theory</Badge>
                <Badge variant="teal">Simulation</Badge>
                <Badge variant="lav">SSA</Badge>
              </div>
            </Card>
          </motion.div>

          {/* ── Tabs ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Tabs" />
            <Card>
              <Tabs
                tabs={[
                  {
                    id: "thermal",
                    label: "Thermal",
                    content: (
                      <div className="space-y-2">
                        <p className="text-sm text-text-primary">DSC, TGA, and DMA characterization data for semicrystalline polymers.</p>
                        <div className="flex gap-2">
                          <Badge variant="sand">DSC</Badge>
                          <Badge variant="rose">DMA</Badge>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "structural",
                    label: "Structural",
                    content: (
                      <div className="space-y-2">
                        <p className="text-sm text-text-primary">SAXS, WAXS, and microscopy results for lamellar and spherulitic structures.</p>
                        <div className="flex gap-2">
                          <Badge variant="slate">SAXS</Badge>
                          <Badge variant="teal">WAXS</Badge>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "kinetics",
                    label: "Kinetics",
                    content: (
                      <div className="space-y-2">
                        <p className="text-sm text-text-primary">Avrami, Ozawa, and Lauritzen-Hoffman kinetic modeling parameters.</p>
                        <div className="flex gap-2">
                          <Badge variant="indigo">Avrami</Badge>
                          <Badge variant="lav">L-H</Badge>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </Card>
          </motion.div>

          {/* ── Status Icons ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Status Indicators" />
            <Card>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} strokeWidth={1.5} className="text-sage-400" />
                  <span className="text-sm text-text-primary">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} strokeWidth={1.5} className="text-sand-400" />
                  <span className="text-sm text-text-primary">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle size={16} strokeWidth={1.5} className="text-rose-400" />
                  <span className="text-sm text-text-primary">Error</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info size={16} strokeWidth={1.5} className="text-slate-400" />
                  <span className="text-sm text-text-primary">Info</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── Tooltip ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Tooltip" />
            <Card>
              <div className="flex items-center gap-6">
                <Tooltip content="Differential Scanning Calorimetry">
                  <span className="text-sm text-text-link underline decoration-dotted cursor-help">DSC</span>
                </Tooltip>
                <Tooltip content="Small-Angle X-ray Scattering">
                  <span className="text-sm text-text-link underline decoration-dotted cursor-help">SAXS</span>
                </Tooltip>
                <Tooltip content="Wide-Angle X-ray Scattering">
                  <span className="text-sm text-text-link underline decoration-dotted cursor-help">WAXS</span>
                </Tooltip>
                <Tooltip content="Successive Self-nucleation and Annealing">
                  <span className="text-sm text-text-link underline decoration-dotted cursor-help">SSA</span>
                </Tooltip>
              </div>
            </Card>
          </motion.div>

          {/* ── Alert ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Alerts" />
            <div className="space-y-3">
              <Alert variant="success" title="Analysis Complete">
                DSC scan processed successfully. 3 thermal transitions detected.
              </Alert>
              <Alert variant="warning" title="Calibration Due">
                SAXS detector calibration expires in 5 days.
              </Alert>
              <Alert variant="error" title="Processing Failed">
                Insufficient data points for Avrami fit. Minimum 10 required.
              </Alert>
              <Alert variant="info">
                New polymer entries can be added via the Database module.
              </Alert>
            </div>
          </motion.div>

          {/* ── Toggle & Checkbox ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Toggle & Checkbox" />
            <Card>
              <p className="text-xs font-medium text-text-secondary mb-3">Toggle Switches</p>
              <div className="flex flex-col gap-3 mb-5">
                <Toggle label="Auto-baseline correction" checked onChange={() => {}} />
                <Toggle label="Show peak annotations" onChange={() => {}} />
                <Toggle label="Disabled option" disabled />
              </div>
              <Divider />
              <p className="text-xs font-medium text-text-secondary mb-3">Checkboxes</p>
              <div className="flex flex-col gap-2.5">
                <Checkbox label="Include melting temperature (Tm)" checked onChange={() => {}} />
                <Checkbox label="Include crystallization temperature (Tc)" onChange={() => {}} />
                <Checkbox label="Include degree of crystallinity (Xc)" checked onChange={() => {}} />
                <Checkbox label="Disabled option" disabled />
              </div>
            </Card>
          </motion.div>

          {/* ── Avatar ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Avatars" />
            <Card>
              <div className="flex items-center gap-4 mb-4">
                <Avatar name="Maria García" size="sm" />
                <Avatar name="John Chen" size="md" />
                <Avatar name="Anna Müller" size="lg" />
                <Avatar name="Kenji Tanaka" size="md" />
                <Avatar name="Sarah Johnson" size="md" />
                <Avatar name="Pierre Dubois" size="md" />
              </div>
              <p className="text-xs text-text-tertiary">Deterministic colors based on name hash. Supports image fallback via src prop.</p>
            </Card>
          </motion.div>

          {/* ── Breadcrumb ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Breadcrumb" />
            <Card>
              <div className="space-y-3">
                <Breadcrumb items={[
                  { label: "Dashboard", href: "/" },
                  { label: "Database", href: "/database" },
                  { label: "Polyethylene" },
                ]} />
                <Breadcrumb items={[
                  { label: "Theory Hub", href: "/theory" },
                  { label: "Kinetics", href: "/kinetics" },
                  { label: "Avrami Analysis", href: "/kinetics/avrami" },
                  { label: "Sample #1247" },
                ]} />
              </div>
            </Card>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Divider" />
            <Card>
              <p className="text-sm text-text-primary">Content above the divider</p>
              <Divider />
              <p className="text-sm text-text-primary">Content below a plain divider</p>
              <Divider label="or" />
              <p className="text-sm text-text-primary">Content below a labeled divider</p>
            </Card>
          </motion.div>

          {/* ── Table ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Data Table" />
            <Card className="p-0 overflow-hidden">
              <DataTable columns={tableColumns} data={tableData} />
            </Card>
          </motion.div>

          {/* ── Charts ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Charts" />
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <p className="text-xs font-medium text-text-secondary mb-3">Crystallization Kinetics — Xc vs Time</p>
                <SimpleAreaChart
                  data={areaChartData}
                  xKey="time"
                  yKey="crystallinity"
                  color="#8B8EE8"
                  height={200}
                />
              </Card>
              <Card>
                <p className="text-xs font-medium text-text-secondary mb-3">Crystallinity by Polymer</p>
                <SimpleBarChart
                  data={barChartData}
                  xKey="polymer"
                  yKey="xc"
                  color="#82A876"
                  height={200}
                />
              </Card>
            </div>
          </motion.div>

          {/* ── Modal ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Modal" />
            <Card>
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Sample Detail"
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
                  </>
                }
              >
                <p className="text-sm text-text-secondary">
                  This is a modal dialog with backdrop blur and scale-in animation.
                  It follows the PolymerCryst design system specifications.
                </p>
              </Modal>
            </Card>
          </motion.div>

          {/* ── Upload Zone ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Upload Zone" />
            <UploadZone accept=".csv, .xls, .txt" />
          </motion.div>

          {/* ── Equation Block ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Equation Block" />
            <EquationBlock
              latex="G(T) = \Delta H_f \left(1 - \frac{T}{T_m^0}\right) - T \Delta S_{conf} + \gamma \cdot A"
            />
            <EquationBlock
              latex="X_c = \frac{\Delta H_m}{\Delta H_m^0} \times 100\%"
              className="mt-4"
            />
          </motion.div>

          {/* ── Loading States ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Loading States" />
            <Card>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">Spinner</p>
                  <div className="flex items-center gap-4">
                    <Spinner size={16} className="text-indigo-400" />
                    <Spinner size={20} className="text-indigo-400" />
                    <Spinner size={28} className="text-indigo-400" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">Skeleton</p>
                  <div className="space-y-2">
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="100%" height={12} />
                    <Skeleton width="80%" height={12} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">Progress Bar</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-text-tertiary">Processing</span>
                        <span className="text-xs text-text-tertiary font-mono">35%</span>
                      </div>
                      <ProgressBar value={35} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-text-tertiary">Complete</span>
                        <span className="text-xs text-text-tertiary font-mono">100%</span>
                      </div>
                      <ProgressBar value={100} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── Surfaces & Depth ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Surface Depth" />
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 rounded-md bg-canvas border border-border-soft">
                <p className="text-xs text-text-tertiary">Canvas</p>
                <p className="text-[10px] font-mono text-text-tertiary">#FAFAF9</p>
              </div>
              <div className="p-4 rounded-md bg-surface-0 border border-border-soft shadow-sm">
                <p className="text-xs text-text-tertiary">Surface 0</p>
                <p className="text-[10px] font-mono text-text-tertiary">#FFFFFF</p>
              </div>
              <div className="p-4 rounded-md bg-surface-1">
                <p className="text-xs text-text-tertiary">Surface 1</p>
                <p className="text-[10px] font-mono text-text-tertiary">#F5F4F2</p>
              </div>
              <div className="p-4 rounded-md bg-surface-2">
                <p className="text-xs text-text-tertiary">Surface 2</p>
                <p className="text-[10px] font-mono text-text-tertiary">#EFEEEC</p>
              </div>
            </div>
          </motion.div>

          {/* ── Shadow Scale ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Shadow Scale" />
            <div className="grid grid-cols-4 gap-4">
              {(["xs", "sm", "md", "lg"] as const).map((size) => (
                <div
                  key={size}
                  className={`p-4 rounded-md bg-surface-0 border border-border-soft shadow-${size}`}
                >
                  <p className="text-xs text-text-tertiary">shadow-{size}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
    </MainLayout>
  );
}
