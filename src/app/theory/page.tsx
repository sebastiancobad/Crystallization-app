"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { BookOpen, Atom, Layers, Thermometer } from "lucide-react";

const concepts = [
  {
    icon: Atom,
    title: "Nucleation Theory",
    description: "Primary and secondary nucleation govern the onset of crystallization from the melt or solution.",
    badge: "Fundamentals",
    color: "text-indigo-400",
    bg: "bg-indigo-50",
  },
  {
    icon: Layers,
    title: "Lamellar Structure",
    description: "Polymer chains fold into thin lamellar crystals with typical thickness of 5–50 nm.",
    badge: "Morphology",
    color: "text-sage-400",
    bg: "bg-sage-50",
  },
  {
    icon: Thermometer,
    title: "Equilibrium Melting Point",
    description: "The Hoffman-Weeks extrapolation determines the equilibrium melting temperature T°m.",
    badge: "Thermodynamics",
    color: "text-sand-400",
    bg: "bg-sand-50",
  },
  {
    icon: BookOpen,
    title: "Regime Theory",
    description: "Hoffman-Lauritzen regime analysis links crystal growth rate to undercooling via surface nucleation.",
    badge: "Kinetics",
    color: "text-slate-400",
    bg: "bg-slate-50",
  },
];

export default function TheoryPage() {
  return (
    <MainLayout title="Theory Hub" subtitle="Crystallization fundamentals">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-teal-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Polymer Crystallization Theory
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Core theoretical frameworks for understanding semicrystalline polymer structure,
            nucleation, growth, and thermodynamics.
          </p>
        </div>

        {/* Concept cards */}
        <div className="grid grid-cols-2 gap-4">
          {concepts.map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} interactive>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-md ${c.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} strokeWidth={1.5} className={c.color} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-text-primary">{c.title}</span>
                      <Badge variant="slate">{c.badge}</Badge>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{c.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Key equations */}
        <Card>
          <CardHeader>
            <CardTitle>Key Equations</CardTitle>
            <CardDescription>Foundational expressions in polymer crystallization</CardDescription>
          </CardHeader>

          <Tabs
            tabs={[
              {
                id: "avrami",
                label: "Avrami",
                content: (
                  <div className="space-y-3">
                    <p className="text-xs text-text-secondary">
                      The Avrami equation describes the overall crystallization kinetics,
                      relating relative crystallinity X(t) to time.
                    </p>
                    <EquationBlock latex="X(t) = 1 - \exp\left(-k \, t^n\right)" />
                    <p className="text-xs text-text-tertiary">
                      Where k is the crystallization rate constant and n is the Avrami exponent
                      (related to nucleation and growth geometry).
                    </p>
                  </div>
                ),
              },
              {
                id: "hoffman",
                label: "Hoffman-Lauritzen",
                content: (
                  <div className="space-y-3">
                    <p className="text-xs text-text-secondary">
                      The Hoffman-Lauritzen theory describes spherulitic growth rate G
                      as a function of crystallization temperature.
                    </p>
                    <EquationBlock latex="G = G_0 \exp\!\left(\frac{-U^*}{R(T_c - T_\infty)}\right) \exp\!\left(\frac{-K_g}{T_c \, \Delta T \, f}\right)" />
                    <p className="text-xs text-text-tertiary">
                      U* is the activation energy for transport, K_g is the nucleation constant,
                      and f is a correction factor.
                    </p>
                  </div>
                ),
              },
              {
                id: "thomson",
                label: "Thomson-Gibbs",
                content: (
                  <div className="space-y-3">
                    <p className="text-xs text-text-secondary">
                      Relates lamellar thickness to melting temperature depression.
                    </p>
                    <EquationBlock latex="T_m = T_m^0 \left(1 - \frac{2\sigma_e}{\Delta h_f \cdot l}\right)" />
                    <p className="text-xs text-text-tertiary">
                      Where σ_e is the fold surface free energy, Δh_f is the heat of fusion per
                      unit volume, and l is the lamellar thickness.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </MainLayout>
  );
}
