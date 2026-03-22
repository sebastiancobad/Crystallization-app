"use client";

import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, MetricCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { fadeUp, stagger } from "@/lib/motion";
import {
  Beaker,
  TrendingUp,
  Database,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <MainLayout title="Dashboard" subtitle="PolymerCryst v0.1">
      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {/* Hero */}
        <motion.div variants={fadeUp}>
          <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-lav-50 border border-border-soft p-8">
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
        </motion.div>

        {/* Metrics */}
        <motion.div variants={fadeUp}>
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Total Samples" value="1,247" subtext="+12 this week" />
            <MetricCard label="Avg. Crystallinity" value="54.3%" subtext="across all polymers" />
            <MetricCard label="Active Studies" value="8" subtext="3 in progress" />
            <MetricCard label="Researchers" value="24" subtext="across 6 labs" />
          </div>
        </motion.div>

        {/* Quick Actions + Recent Activity */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
          {/* Quick actions */}
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

          {/* Recent activity */}
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
                    <Badge variant={item.badge}>{item.badge === "sage" ? "DSC" : item.badge === "sand" ? "WAXS" : "Theory"}</Badge>
                    <span className="text-xs text-text-primary">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-text-tertiary">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Current Studies */}
        <motion.div variants={fadeUp}>
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
      </motion.div>
    </MainLayout>
  );
}
