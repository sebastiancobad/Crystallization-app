"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";

const researchers = [
  {
    name: "Dr. Elena Marchetti",
    role: "Principal Investigator",
    lab: "Polymer Physics Lab",
    focus: "HDPE spherulitic growth",
    experiments: 34,
    publications: 12,
    active: true,
  },
  {
    name: "Prof. Kenji Tanaka",
    role: "Senior Researcher",
    lab: "Advanced Materials Center",
    focus: "iPP crystallization kinetics",
    experiments: 28,
    publications: 18,
    active: true,
  },
  {
    name: "Dr. Sarah Chen",
    role: "Postdoctoral Fellow",
    lab: "Biopolymer Lab",
    focus: "PLA nucleation & SSA",
    experiments: 15,
    publications: 5,
    active: true,
  },
  {
    name: "Dr. Marcus Weber",
    role: "Research Scientist",
    lab: "X-ray Scattering Facility",
    focus: "SAXS/WAXS characterization",
    experiments: 42,
    publications: 9,
    active: false,
  },
  {
    name: "Ana Rodríguez",
    role: "PhD Candidate",
    lab: "Polymer Physics Lab",
    focus: "PET non-isothermal kinetics",
    experiments: 8,
    publications: 2,
    active: true,
  },
  {
    name: "Dr. Liam O'Brien",
    role: "Visiting Researcher",
    lab: "Computational Materials",
    focus: "Hoffman-Lauritzen modeling",
    experiments: 11,
    publications: 7,
    active: false,
  },
];

const labs = [
  { name: "Polymer Physics Lab", members: 8, experiments: 156, focus: "Morphology & growth" },
  { name: "Advanced Materials Center", members: 6, experiments: 98, focus: "High-performance polymers" },
  { name: "Biopolymer Lab", members: 5, experiments: 67, focus: "Biodegradable polymers" },
  { name: "X-ray Scattering Facility", members: 3, experiments: 210, focus: "SAXS/WAXS service" },
  { name: "Computational Materials", members: 4, experiments: 45, focus: "Simulation & theory" },
  { name: "Thermal Analysis Core", members: 2, experiments: 320, focus: "DSC & TGA service" },
];

export default function ResearchersPage() {
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();
  const filteredResearchers = researchers.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.role.toLowerCase().includes(q) ||
      r.lab.toLowerCase().includes(q) ||
      r.focus.toLowerCase().includes(q),
  );
  const filteredLabs = labs.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.focus.toLowerCase().includes(q),
  );

  return (
    <MainLayout title="Researchers" subtitle="Teams & collaborators">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Researchers" value="24" subtext="across 6 labs" />
          <MetricCard label="Active" value="18" subtext="currently working" />
          <MetricCard label="Publications" value="53" subtext="total output" />
          <MetricCard label="Experiments" value="896" subtext="combined" />
        </div>

        <SearchInput
          placeholder="Search researchers, labs, focus areas..."
          className="max-w-sm"
          value={search}
          onSearch={(v) => setSearch(v)}
        />

        <Tabs
          tabs={[
            {
              id: "team",
              label: `Team Members (${filteredResearchers.length})`,
              content: (
                <div className="grid grid-cols-2 gap-4">
                  {filteredResearchers.length === 0 ? (
                    <div className="col-span-2 py-12 text-center">
                      <p className="text-sm text-text-tertiary">
                        No researchers match &quot;{search}&quot;
                      </p>
                    </div>
                  ) : (
                    filteredResearchers.map((r) => (
                      <Card key={r.name} interactive>
                        <div className="flex items-start gap-3">
                          <Avatar name={r.name} size="lg" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-text-primary truncate">{r.name}</span>
                              <Badge variant={r.active ? "sage" : "slate"}>
                                {r.active ? "active" : "away"}
                              </Badge>
                            </div>
                            <p className="text-xs text-text-tertiary">{r.role} — {r.lab}</p>
                            <p className="text-xs text-text-secondary mt-1">{r.focus}</p>
                            <div className="flex items-center gap-4 mt-2 text-[10px] text-text-tertiary uppercase tracking-wider">
                              <span>{r.experiments} experiments</span>
                              <span>{r.publications} publications</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              ),
            },
            {
              id: "labs",
              label: `Research Labs (${filteredLabs.length})`,
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Research Labs</CardTitle>
                    <CardDescription>Lab groups and their contributions</CardDescription>
                  </CardHeader>
                  <div className="space-y-4">
                    {filteredLabs.length === 0 ? (
                      <p className="text-sm text-text-tertiary py-8 text-center">
                        No labs match &quot;{search}&quot;
                      </p>
                    ) : (
                      filteredLabs.map((lab) => (
                        <div key={lab.name} className="flex items-center gap-4">
                          <div className="w-48">
                            <span className="text-sm text-text-primary">{lab.name}</span>
                            <p className="text-[10px] text-text-tertiary">{lab.focus}</p>
                          </div>
                          <Badge variant="indigo">{lab.members} members</Badge>
                          <div className="flex-1">
                            <ProgressBar value={Math.min(100, (lab.experiments / 320) * 100)} />
                          </div>
                          <span className="text-xs font-mono text-text-tertiary w-20 text-right">
                            {lab.experiments} expts
                          </span>
                        </div>
                      ))
                    )}
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
