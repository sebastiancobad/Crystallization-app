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

const stats = [
  { value: "1,247", label: "Samples" },
  { value: "54.3%", label: "Avg Crystallinity" },
  { value: "24", label: "Researchers" },
  { value: "8", label: "Active Studies" },
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

      {/* Texture overlay — subtle crystalline noise */}
      <div
        className="absolute inset-0 -z-[5] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230E524E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <Badge variant="teal" className="mb-6">
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
            <span className="bg-gradient-to-r from-indigo-400 via-teal-400 to-indigo-600 bg-clip-text text-transparent">
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

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-16 grid grid-cols-4 gap-8 max-w-lg mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-text-primary">{stat.value}</div>
                <div className="text-[11px] text-text-tertiary uppercase tracking-wider mt-1">
                  {stat.label}
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
import { Card, MetricCard } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  Database,
  TrendingUp,
} from "lucide-react";

function DashboardView({ onBack }: { onBack: () => void }) {
  return (
    <MainLayout title="Dashboard" subtitle="PolymerCryst v0.1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Hero */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-teal-50 border border-border-soft p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-text-primary mb-2">
                Polymer Crystallization Platform
              </h1>
              <p className="text-sm text-text-secondary max-w-xl mb-5">
                Analyze crystallization kinetics, model spherulitic growth, and explore
                structure-property relationships across polymer families.
              </p>
              <div className="flex gap-3">
                <Button variant="primary">
                  New Experiment
                  <ArrowRight size={14} strokeWidth={2} />
                </Button>
                <Button variant="secondary" href="/showcase">
                  View Components
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

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Total Samples" value="1,247" subtext="+12 this week" />
          <MetricCard label="Avg. Crystallinity" value="54.3%" subtext="across all polymers" />
          <MetricCard label="Active Studies" value="8" subtext="3 in progress" />
          <MetricCard label="Researchers" value="24" subtext="across 6 labs" />
        </div>

        {/* Quick Actions + Recent Activity */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <h3 className="text-sm font-medium text-text-primary mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-md bg-surface-1 hover:bg-surface-2 transition-colors">
                <Beaker size={20} strokeWidth={1.5} className="text-indigo-400" />
                <span className="text-xs font-medium text-text-primary">New DSC Run</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-md bg-surface-1 hover:bg-surface-2 transition-colors">
                <TrendingUp size={20} strokeWidth={1.5} className="text-sage-400" />
                <span className="text-xs font-medium text-text-primary">Avrami Fit</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-md bg-surface-1 hover:bg-surface-2 transition-colors">
                <Database size={20} strokeWidth={1.5} className="text-teal-400" />
                <span className="text-xs font-medium text-text-primary">Browse DB</span>
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-text-primary mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { label: "HDPE isothermal DSC", badge: "sage" as const, time: "2h ago" },
                { label: "iPP WAXS analysis", badge: "sand" as const, time: "5h ago" },
                { label: "PLA Avrami model", badge: "slate" as const, time: "1d ago" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.badge}>
                      {item.badge === "sage" ? "DSC" : item.badge === "sand" ? "WAXS" : "Theory"}
                    </Badge>
                    <span className="text-xs text-text-primary">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-text-tertiary">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active Studies */}
        <Card>
          <h3 className="text-sm font-medium text-text-primary mb-4">Active Studies</h3>
          <div className="space-y-4">
            {[
              { name: "HDPE Spherulite Growth Rate", progress: 72, method: "PLM" },
              { name: "iPP SSA Fractionation", progress: 45, method: "DSC" },
              { name: "PET Non-isothermal Kinetics", progress: 18, method: "DSC" },
            ].map((study) => (
              <div key={study.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-primary">{study.name}</span>
                    <Badge variant="indigo">{study.method}</Badge>
                  </div>
                  <span className="text-xs font-mono text-text-tertiary">{study.progress}%</span>
                </div>
                <ProgressBar value={study.progress} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </MainLayout>
  );
}
