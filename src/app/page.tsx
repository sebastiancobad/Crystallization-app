"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Beaker,
  BarChart2,
  Layers,
  Microscope,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/* Lazy-load 3D scene so it doesn't block SSR */
const Crystal3DScene = dynamic(
  () => import("@/components/three/crystal-scene").then((m) => m.Crystal3DScene),
  { ssr: false },
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const features = [
  {
    icon: Beaker,
    title: "DSC & Isothermal Analysis",
    description: "Run differential scanning calorimetry experiments with real-time Avrami fitting.",
    color: "text-indigo-400",
    bg: "bg-indigo-50",
  },
  {
    icon: BarChart2,
    title: "Crystallization Kinetics",
    description: "Model nucleation, spherulitic growth rates, and Hoffman-Lauritzen parameters.",
    color: "text-sage-400",
    bg: "bg-sage-50",
  },
  {
    icon: Layers,
    title: "SAXS / WAXS Integration",
    description: "Analyze scattering patterns, lamellar thickness, and crystal structure.",
    color: "text-sand-400",
    bg: "bg-sand-50",
  },
  {
    icon: Microscope,
    title: "Structure-Property Maps",
    description: "Correlate crystallinity, morphology, and mechanical behavior across polymer families.",
    color: "text-teal-400",
    bg: "bg-teal-50",
  },
];

const capabilities = [
  { value: "7", label: "Modules" },
  { value: "5+", label: "Kinetic Models" },
  { value: "8", label: "Polymer Families" },
  { value: "4", label: "Analysis Methods" },
];

export default function IntroPage() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return <DashboardView onBack={() => setEntered(false)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-canvas">
      {/* 3D Background */}
      <Crystal3DScene />

      {/* Texture overlay — crystal lattice wireframe */}
      <div
        className="absolute inset-0 -z-[5] opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='lattice' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3C!-- nodes --%3E%3Ccircle cx='0' cy='0' r='2' fill='%230A1A38'/%3E%3Ccircle cx='60' cy='0' r='2' fill='%230A1A38'/%3E%3Ccircle cx='120' cy='0' r='2' fill='%230A1A38'/%3E%3Ccircle cx='30' cy='35' r='1.5' fill='%230A1A38'/%3E%3Ccircle cx='90' cy='35' r='1.5' fill='%230A1A38'/%3E%3Ccircle cx='0' cy='60' r='2' fill='%230A1A38'/%3E%3Ccircle cx='60' cy='60' r='2' fill='%230A1A38'/%3E%3Ccircle cx='120' cy='60' r='2' fill='%230A1A38'/%3E%3Ccircle cx='30' cy='95' r='1.5' fill='%230A1A38'/%3E%3Ccircle cx='90' cy='95' r='1.5' fill='%230A1A38'/%3E%3C!-- bonds: horizontal --%3E%3Cline x1='0' y1='0' x2='60' y2='0' stroke='%231B3A6B' stroke-width='0.6'/%3E%3Cline x1='60' y1='0' x2='120' y2='0' stroke='%231B3A6B' stroke-width='0.6'/%3E%3Cline x1='0' y1='60' x2='60' y2='60' stroke='%231B3A6B' stroke-width='0.6'/%3E%3Cline x1='60' y1='60' x2='120' y2='60' stroke='%231B3A6B' stroke-width='0.6'/%3E%3C!-- bonds: diagonal --%3E%3Cline x1='0' y1='0' x2='30' y2='35' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='60' y1='0' x2='30' y2='35' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='60' y1='0' x2='90' y2='35' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='120' y1='0' x2='90' y2='35' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='30' y1='35' x2='0' y2='60' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='30' y1='35' x2='60' y2='60' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='90' y1='35' x2='60' y2='60' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='90' y1='35' x2='120' y2='60' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='0' y1='60' x2='30' y2='95' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='60' y1='60' x2='30' y2='95' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='60' y1='60' x2='90' y2='95' stroke='%231B3A6B' stroke-width='0.5'/%3E%3Cline x1='120' y1='60' x2='90' y2='95' stroke='%231B3A6B' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23lattice)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 -z-[4] bg-gradient-to-b from-canvas/40 via-canvas/70 to-canvas" />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge variant="indigo" className="mb-6">
              <Sparkles size={10} className="mr-1" />
              v0.1 — Research Preview
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-5xl sm:text-6xl font-semibold tracking-tight text-text-primary leading-[1.1] mb-5"
          >
            Polymer
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-slate-400 to-indigo-600 bg-clip-text text-transparent">
              Crystallization
            </span>
            <br />
            Platform
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-lg text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Analyze crystallization kinetics, model spherulitic growth, and
            explore structure-property relationships across polymer families.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="flex items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" onClick={() => setEntered(true)}>
              Enter Platform
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
            <Button variant="secondary" size="lg" href="/showcase">
              Design System
            </Button>
          </motion.div>

          {/* Capabilities row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-16 grid grid-cols-4 gap-8 max-w-lg mx-auto"
          >
            {capabilities.map((cap) => (
              <div key={cap.label} className="text-center">
                <div className="text-2xl font-semibold text-text-primary">{cap.value}</div>
                <div className="text-[11px] text-text-tertiary uppercase tracking-wider mt-1">
                  {cap.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-text-tertiary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold text-text-primary mb-3">
            Research-grade tools
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Everything you need to study polymer crystallization, from raw data
            to publication-ready analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative p-6 rounded-lg bg-surface-0/80 backdrop-blur-sm border border-border-soft hover:border-border-med hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-md ${feature.bg} flex items-center justify-center mb-4`}
                >
                  <Icon size={20} strokeWidth={1.5} className={feature.color} />
                </div>
                <h3 className="text-sm font-medium text-text-primary mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-text-tertiary text-xs mb-6 uppercase tracking-wider">
            Ready to explore?
          </p>
          <Button variant="primary" size="lg" onClick={() => setEntered(true)}>
            Open Dashboard
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Dashboard view (after entering) ── */
import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Database,
  BookOpen,
  Activity,
  Sliders,
  Users,
  FlaskConical,
} from "lucide-react";

const modules = [
  { icon: BookOpen, label: "Theory Hub", href: "/theory", desc: "Crystallization fundamentals & equations", color: "text-indigo-400", bg: "bg-indigo-50" },
  { icon: Layers, label: "SSA Module", href: "/ssa", desc: "Successive self-nucleation & annealing", color: "text-sage-400", bg: "bg-sage-50" },
  { icon: Activity, label: "SAXS / WAXS", href: "/saxs", desc: "X-ray scattering analysis", color: "text-sand-400", bg: "bg-sand-50" },
  { icon: BarChart2, label: "Kinetics", href: "/kinetics", desc: "Crystallization kinetics modeling", color: "text-slate-400", bg: "bg-slate-50" },
  { icon: Sliders, label: "Simulation", href: "/simulation", desc: "Run crystallization simulations", color: "text-teal-400", bg: "bg-teal-50" },
  { icon: Database, label: "Database", href: "/database", desc: "Polymer & experiment records", color: "text-rose-400", bg: "bg-rose-50" },
  { icon: Users, label: "Researchers", href: "/researchers", desc: "Teams & collaborators", color: "text-lav-400", bg: "bg-lav-50" },
];

function DashboardView({ onBack }: { onBack: () => void }) {
  return (
    <MainLayout title="Dashboard" subtitle="PolymerCryst v0.1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Welcome hero */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-slate-50 border border-border-soft p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-text-primary mb-2">
                Welcome to PolymerCryst
              </h1>
              <p className="text-sm text-text-secondary max-w-xl mb-5">
                Get started by exploring a module below. Browse crystallization theory,
                run simulations, or check the polymer database.
              </p>
              <div className="flex gap-3">
                <Button variant="primary" href="/theory">
                  Start with Theory
                  <ArrowRight size={14} strokeWidth={2} />
                </Button>
                <Button variant="secondary" href="/showcase">
                  Design System
                </Button>
              </div>
            </div>
            <button
              onClick={onBack}
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Back to intro
            </button>
          </div>
        </div>

        {/* Module grid */}
        <div>
          <h2 className="text-sm font-medium text-text-primary mb-3">Modules</h2>
          <div className="grid grid-cols-3 gap-3">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.label}
                  href={m.href}
                  className="flex items-start gap-3 p-4 rounded-md bg-surface-0 border border-border-soft hover:border-border-med hover:shadow-sm transition-all duration-150"
                >
                  <div className={`w-9 h-9 rounded-md ${m.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} strokeWidth={1.5} className={m.color} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-text-primary">{m.label}</span>
                    <p className="text-xs text-text-secondary mt-0.5">{m.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Empty recent activity */}
        <Card>
          <EmptyState
            icon={<FlaskConical strokeWidth={1.5} />}
            title="No experiments yet"
            description="Your recent activity and experiment results will appear here as you use the platform."
            action={
              <Button variant="secondary" size="sm" href="/simulation">
                Run your first simulation
              </Button>
            }
          />
        </Card>
      </motion.div>
    </MainLayout>
  );
}
