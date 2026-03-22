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
import { Dropdown } from "@/components/ui/dropdown";
import { useToast } from "@/components/ui/toast";
import { RadioGroup } from "@/components/ui/radio-group";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Kbd } from "@/components/ui/kbd";
import { Accordion } from "@/components/ui/accordion";
import { SearchInput } from "@/components/ui/search-input";
import { Popover } from "@/components/ui/popover";
import { fadeUp, stagger } from "@/lib/motion";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  MoreHorizontal,
  Copy,
  Pencil,
  Trash2,
  FileX,
  Settings,
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
  { name: "Navy", prefix: "indigo", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Sage", prefix: "sage", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Rose", prefix: "rose", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Sand", prefix: "sand", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Slate", prefix: "slate", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Teal", prefix: "teal", stops: [50, 100, 200, 400, 600, 800] },
  { name: "Copper", prefix: "lav", stops: [50, 100, 200, 400, 600, 800] },
];

const colorMap: Record<string, string> = {
  "indigo-50": "#EDF1F7", "indigo-100": "#D5DEEC", "indigo-200": "#A6BAD4",
  "indigo-400": "#1B3A6B", "indigo-600": "#122850", "indigo-800": "#0A1A38",
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
  "lav-50": "#FBF5F0", "lav-100": "#F5E6D8", "lav-200": "#E8C9AD",
  "lav-400": "#C4885A", "lav-600": "#8F5E36", "lav-800": "#5A3A1F",
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
  { polymer: "Polyethylene (HDPE)", method: "DSC", tm: "132.0", tc: "115.3", crystallinity: "72.4" },
  { polymer: "Polypropylene (iPP)", method: "WAXS", tm: "165.0", tc: "112.3", crystallinity: "58.1" },
  { polymer: "PLA", method: "DSC", tm: "168.5", tc: "102.7", crystallinity: "42.3" },
  { polymer: "PET", method: "SAXS", tm: "252.0", tc: "198.5", crystallinity: "35.6" },
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

/* ── Showcase sections ── */
const sections = [
  "Color Palette", "Typography", "Buttons", "Cards", "Form Controls",
  "Badges & Tags", "Tabs", "Status Indicators", "Tooltip", "Alerts",
  "Toggle & Checkbox", "Avatars", "Breadcrumb", "Divider", "Dropdown Menu",
  "Toast Notifications", "Radio Group", "Pagination", "Empty State",
  "Keyboard Shortcuts", "Accordion", "Search Input", "Popover",
  "Data Table", "Charts", "Modal", "Upload Zone", "Equation Block",
  "Loading States", "Surface Depth", "Shadow Scale",
];

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/* ── Section header component ── */
function SectionHeader({ title }: { title: string }) {
  return (
    <div id={sectionId(title)} className="flex items-center gap-3 mb-6 mt-12 first:mt-0 scroll-mt-20">
      <div className="w-0.5 h-5 bg-indigo-400 rounded-full" />
      <h2 className="text-xl font-medium text-text-primary">{title}</h2>
    </div>
  );
}

/* ── Section navigation sidebar ── */
function SectionNav() {
  return (
    <nav className="hidden xl:block fixed right-6 top-24 w-48 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="text-[10px] uppercase tracking-widest text-text-tertiary font-medium mb-2">Sections</p>
      <ul className="space-y-0.5">
        {sections.map((s) => (
          <li key={s}>
            <a
              href={`#${sectionId(s)}`}
              className="block text-xs text-text-tertiary hover:text-text-primary py-0.5 transition-colors"
            >
              {s}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ShowcasePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("avrami");
  const [currentPage, setCurrentPage] = useState(3);
  const { toast } = useToast();

  return (
    <MainLayout title="Design System Showcase" subtitle="PolymerCryst v0.1">
        <SectionNav />
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
              <MetricCard label="Melting Point" value="132.0" subtext="Tm (C)" />
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
                      <p className="text-lg font-medium text-text-primary">132.0°C</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-tertiary uppercase tracking-wide">Tc</p>
                      <p className="text-lg font-medium text-text-primary">115.3°C</p>
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

          {/* ── Dropdown ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Dropdown Menu" />
            <Card>
              <div className="flex items-center gap-4">
                <Dropdown
                  trigger={
                    <Button variant="secondary" size="sm">
                      Actions <MoreHorizontal size={14} />
                    </Button>
                  }
                  items={[
                    { label: "Copy ID", icon: <Copy size={14} />, onClick: () => toast("info", "Copied to clipboard") },
                    { label: "Edit Sample", icon: <Pencil size={14} /> },
                    { divider: true, label: "" },
                    { label: "Delete", icon: <Trash2 size={14} />, danger: true },
                  ]}
                />
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  }
                  items={[
                    { label: "Export CSV" },
                    { label: "Export JSON" },
                    { label: "Print Report" },
                  ]}
                  align="right"
                />
              </div>
            </Card>
          </motion.div>

          {/* ── Toast ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Toast Notifications" />
            <Card>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="sm" onClick={() => toast("success", "DSC scan processed successfully.", "Success")}>
                  Success Toast
                </Button>
                <Button variant="secondary" size="sm" onClick={() => toast("warning", "Calibration expires in 5 days.")}>
                  Warning Toast
                </Button>
                <Button variant="secondary" size="sm" onClick={() => toast("error", "Insufficient data points for Avrami fit.", "Error")}>
                  Error Toast
                </Button>
                <Button variant="secondary" size="sm" onClick={() => toast("info", "New polymer entries can be added via Database.")}>
                  Info Toast
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* ── Radio Group ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Radio Group" />
            <Card>
              <RadioGroup
                name="kinetic-model"
                value={radioValue}
                onChange={setRadioValue}
                options={[
                  { value: "avrami", label: "Avrami Model", description: "Isothermal crystallization kinetics" },
                  { value: "ozawa", label: "Ozawa Model", description: "Non-isothermal crystallization" },
                  { value: "lh", label: "Lauritzen-Hoffman", description: "Spherulitic growth rate theory" },
                ]}
              />
            </Card>
          </motion.div>

          {/* ── Pagination ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Pagination" />
            <Card>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-tertiary">Showing 21-30 of 124 results</p>
                <Pagination
                  currentPage={currentPage}
                  totalPages={13}
                  onPageChange={setCurrentPage}
                />
              </div>
            </Card>
          </motion.div>

          {/* ── Empty State ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Empty State" />
            <Card>
              <EmptyState
                icon={<FileX strokeWidth={1.5} />}
                title="No samples found"
                description="Try adjusting your search filters or add a new polymer sample to get started."
                action={<Button variant="primary" size="sm">Add Sample</Button>}
              />
            </Card>
          </motion.div>

          {/* ── Kbd ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Keyboard Shortcuts" />
            <Card>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Search</span>
                  <div className="flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">New experiment</span>
                  <div className="flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>N</Kbd></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Save</span>
                  <div className="flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>S</Kbd></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Escape</span>
                  <Kbd>Esc</Kbd>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── Accordion ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Accordion" />
            <Card>
              <Accordion
                defaultOpen="avrami"
                items={[
                  {
                    id: "avrami",
                    title: "Avrami Equation",
                    content: "The Avrami equation describes isothermal crystallization kinetics: X(t) = 1 − exp(−Ktⁿ), where K is the overall crystallization rate constant and n (the Avrami exponent, typically 1–4) reflects nucleation type (sporadic vs predetermined) and growth dimensionality.",
                  },
                  {
                    id: "ozawa",
                    title: "Ozawa Analysis",
                    content: "The Ozawa method extends the Avrami analysis to non-isothermal conditions: 1 − X(T) = exp(−K(T)/φᵐ), where K(T) is the cooling function, φ is the cooling rate, and m is the Ozawa exponent. It assumes the non-isothermal process can be decomposed into infinitesimal isothermal steps.",
                  },
                  {
                    id: "lh",
                    title: "Lauritzen-Hoffman Theory",
                    content: "Lauritzen–Hoffman theory models the temperature dependence of crystal (lamellar) growth rate G = G₀ exp(−U*/R(T−T∞)) exp(−Kᵍ/T·ΔT·f). Three kinetic regimes are defined: Regime I (single surface nucleus controls growth), Regime II (multiple nuclei compete with lateral spreading), and Regime III (prolific nucleation dominates).",
                  },
                ]}
              />
            </Card>
          </motion.div>

          {/* ── Search Input ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Search Input" />
            <Card>
              <div className="max-w-sm space-y-3">
                <SearchInput placeholder="Search polymers..." />
                <SearchInput placeholder="Filter experiments..." disabled />
              </div>
            </Card>
          </motion.div>

          {/* ── Popover ── */}
          <motion.div variants={fadeUp}>
            <SectionHeader title="Popover" />
            <Card>
              <div className="flex gap-4">
                <Popover
                  trigger={
                    <Button variant="secondary" size="sm">
                      <Settings size={14} /> Settings
                    </Button>
                  }
                >
                  <div className="w-56 space-y-3">
                    <p className="text-sm font-medium text-text-primary">Display Settings</p>
                    <div className="space-y-2">
                      <Toggle label="Show grid lines" checked onChange={() => {}} />
                      <Toggle label="Auto-scale axes" onChange={() => {}} />
                    </div>
                  </div>
                </Popover>
                <Popover
                  trigger={<Badge variant="indigo">3 filters</Badge>}
                  align="center"
                >
                  <div className="w-48">
                    <p className="text-xs font-medium text-text-primary mb-2">Active Filters</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Method</span>
                        <Badge variant="sand">DSC</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Polymer</span>
                        <Badge variant="sage">HDPE</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Year</span>
                        <Badge variant="slate">2026</Badge>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
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
              latex="\Delta G = \Delta H_f^0 \left(1 - \frac{T}{T_m^0}\right) + 2 \sigma_e / \ell"
            />
            <EquationBlock
              latex="X_c = \frac{\Delta H_m}{\Delta H_m^{100}} \times 100\%"
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
