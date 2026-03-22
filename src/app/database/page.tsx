"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/table";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";

const polymerDb = [
  { id: "P001", name: "HDPE", Tm: "135", Tg: "-120", Xc: "70", structure: "Linear PE", family: "Polyolefin" },
  { id: "P002", name: "iPP", Tm: "165", Tg: "-10", Xc: "55", structure: "Isotactic PP", family: "Polyolefin" },
  { id: "P003", name: "PET", Tm: "260", Tg: "75", Xc: "42", structure: "Poly(ethylene terephthalate)", family: "Polyester" },
  { id: "P004", name: "PLA", Tm: "175", Tg: "60", Xc: "38", structure: "Poly(lactic acid)", family: "Polyester" },
  { id: "P005", name: "PEEK", Tm: "343", Tg: "143", Xc: "35", structure: "Poly(ether ether ketone)", family: "Polyaryletherketone" },
  { id: "P006", name: "PA6", Tm: "220", Tg: "50", Xc: "45", structure: "Nylon 6", family: "Polyamide" },
  { id: "P007", name: "PVDF", Tm: "177", Tg: "-40", Xc: "50", structure: "Poly(vinylidene fluoride)", family: "Fluoropolymer" },
  { id: "P008", name: "PBS", Tm: "115", Tg: "-34", Xc: "40", structure: "Poly(butylene succinate)", family: "Polyester" },
];

const experimentDb = [
  { id: "E001", date: "2024-12-15", polymer: "HDPE", method: "DSC", Tc: "120", notes: "Isothermal, n=2.8" },
  { id: "E002", date: "2024-12-18", polymer: "iPP", method: "PLM", Tc: "135", notes: "Growth rate study" },
  { id: "E003", date: "2025-01-05", polymer: "PET", method: "SAXS", Tc: "200", notes: "Lamellar spacing" },
  { id: "E004", date: "2025-01-12", polymer: "PLA", method: "DSC", Tc: "110", notes: "Non-isothermal, β=10" },
  { id: "E005", date: "2025-01-20", polymer: "HDPE", method: "WAXS", Tc: "—", notes: "Crystal structure" },
  { id: "E006", date: "2025-02-02", polymer: "PEEK", method: "DSC", Tc: "305", notes: "High-T isothermal" },
];

export default function DatabasePage() {
  return (
    <MainLayout title="Database" subtitle="Polymer & experiment records">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Polymers" value="8" subtext="in database" />
          <MetricCard label="Experiments" value="6" subtext="recorded" />
          <MetricCard label="Families" value="5" subtext="polymer families" />
          <MetricCard label="Methods" value="4" subtext="DSC, PLM, SAXS, WAXS" />
        </div>

        {/* Search + Actions */}
        <div className="flex items-center justify-between">
          <SearchInput placeholder="Search polymers, experiments..." className="w-80" />
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Upload size={14} /> Import</Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export CSV</Button>
          </div>
        </div>

        {/* Tables */}
        <Tabs
          tabs={[
            {
              id: "polymers",
              label: "Polymers",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Polymer Database</CardTitle>
                    <CardDescription>Reference data for semicrystalline polymers</CardDescription>
                  </CardHeader>
                  <DataTable
                    columns={[
                      { key: "id", header: "ID" },
                      { key: "name", header: "Name" },
                      { key: "Tm", header: "Tm (°C)", numeric: true },
                      { key: "Tg", header: "Tg (°C)", numeric: true },
                      { key: "Xc", header: "X_c (%)", numeric: true },
                      { key: "family", header: "Family", render: (row) => (
                        <Badge variant="teal">{row.family as string}</Badge>
                      )},
                    ]}
                    data={polymerDb}
                  />
                </Card>
              ),
            },
            {
              id: "experiments",
              label: "Experiments",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Experiment Log</CardTitle>
                    <CardDescription>Recorded crystallization experiments</CardDescription>
                  </CardHeader>
                  <DataTable
                    columns={[
                      { key: "id", header: "ID" },
                      { key: "date", header: "Date" },
                      { key: "polymer", header: "Polymer" },
                      { key: "method", header: "Method", render: (row) => (
                        <Badge variant={
                          (row.method as string) === "DSC" ? "sage" :
                          (row.method as string) === "PLM" ? "indigo" :
                          (row.method as string) === "SAXS" ? "sand" : "slate"
                        }>
                          {row.method as string}
                        </Badge>
                      )},
                      { key: "Tc", header: "Tc (°C)", numeric: true },
                      { key: "notes", header: "Notes" },
                    ]}
                    data={experimentDb}
                  />
                </Card>
              ),
            },
          ]}
        />
      </div>
    </MainLayout>
  );
}
