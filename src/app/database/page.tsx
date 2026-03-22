"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription, MetricCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/table";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";

const polymerDb = [
  { id: "P001", name: "HDPE", fullName: "High-density polyethylene", Tm: "135", Tg: "-120", Xc: "70", family: "Polyolefin" },
  { id: "P002", name: "LDPE", fullName: "Low-density polyethylene", Tm: "115", Tg: "-120", Xc: "45", family: "Polyolefin" },
  { id: "P003", name: "iPP", fullName: "Isotactic polypropylene", Tm: "165", Tg: "-10", Xc: "55", family: "Polyolefin" },
  { id: "P004", name: "PET", fullName: "Poly(ethylene terephthalate)", Tm: "260", Tg: "75", Xc: "42", family: "Polyester" },
  { id: "P005", name: "PLA", fullName: "Poly(lactic acid)", Tm: "175", Tg: "60", Xc: "38", family: "Polyester" },
  { id: "P006", name: "PBS", fullName: "Poly(butylene succinate)", Tm: "115", Tg: "-34", Xc: "40", family: "Polyester" },
  { id: "P007", name: "PCL", fullName: "Poly(ε-caprolactone)", Tm: "60", Tg: "-60", Xc: "50", family: "Polyester" },
  { id: "P008", name: "PEEK", fullName: "Poly(ether ether ketone)", Tm: "343", Tg: "143", Xc: "35", family: "PAEK" },
  { id: "P009", name: "PA6", fullName: "Polyamide 6 (Nylon 6)", Tm: "220", Tg: "50", Xc: "45", family: "Polyamide" },
  { id: "P010", name: "PA66", fullName: "Polyamide 66", Tm: "265", Tg: "50", Xc: "50", family: "Polyamide" },
  { id: "P011", name: "PVDF", fullName: "Poly(vinylidene fluoride)", Tm: "177", Tg: "-40", Xc: "50", family: "Fluoropolymer" },
  { id: "P012", name: "POM", fullName: "Polyoxymethylene", Tm: "175", Tg: "-72", Xc: "75", family: "Polyacetal" },
];

const crystalStructures = [
  { id: "C001", polymer: "PE", system: "Orthorhombic", a: "7.42", b: "4.95", c: "2.55", spaceGroup: "Pnam" },
  { id: "C002", polymer: "iPP (α)", system: "Monoclinic", a: "6.65", b: "20.96", c: "6.50", spaceGroup: "C2/c" },
  { id: "C003", polymer: "iPP (β)", system: "Trigonal", a: "11.01", b: "11.01", c: "6.50", spaceGroup: "P3₁" },
  { id: "C004", polymer: "PET", system: "Triclinic", a: "4.56", b: "5.94", c: "10.75", spaceGroup: "P1̄" },
  { id: "C005", polymer: "PA6 (α)", system: "Monoclinic", a: "9.56", b: "17.24", c: "8.01", spaceGroup: "P2₁/a" },
  { id: "C006", polymer: "PVDF (α)", system: "Orthorhombic", a: "4.96", b: "9.64", c: "4.62", spaceGroup: "Cm2m" },
  { id: "C007", polymer: "PVDF (β)", system: "Orthorhombic", a: "8.58", b: "4.91", c: "2.56", spaceGroup: "Cm2m" },
];

export default function DatabasePage() {
  const [search, setSearch] = useState("");

  const filteredPolymers = polymerDb.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.family.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <MainLayout title="Database" subtitle="Polymer & crystal structure reference">
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard label="Polymers" value={polymerDb.length.toString()} subtext="in database" />
          <MetricCard label="Families" value="7" subtext="polymer families" />
          <MetricCard label="Crystal Structures" value={crystalStructures.length.toString()} subtext="unit cells catalogued" />
          <MetricCard label="Tm Range" value="60–343°C" subtext="across database" />
        </div>

        {/* Search */}
        <SearchInput
          placeholder="Search by name, full name, or family..."
          className="max-w-sm"
          value={search}
          onSearch={(v) => setSearch(v)}
        />

        {/* Tables */}
        <Tabs
          tabs={[
            {
              id: "polymers",
              label: "Thermal Properties",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Semicrystalline Polymer Database</CardTitle>
                    <CardDescription>
                      Reference melting temperatures (Tm), glass transitions (Tg), and typical crystallinity values.
                      All Tm and Tg values from literature for standard grades.
                    </CardDescription>
                  </CardHeader>
                  <DataTable
                    columns={[
                      { key: "name", header: "Abbrev." },
                      { key: "fullName", header: "Full Name" },
                      { key: "Tm", header: "Tm (°C)", numeric: true },
                      { key: "Tg", header: "Tg (°C)", numeric: true },
                      { key: "Xc", header: "Xc,max (%)", numeric: true },
                      {
                        key: "family",
                        header: "Family",
                        render: (row) => <Badge variant="indigo">{row.family as string}</Badge>,
                      },
                    ]}
                    data={filteredPolymers}
                  />
                </Card>
              ),
            },
            {
              id: "crystals",
              label: "Crystal Structures",
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Unit Cell Parameters</CardTitle>
                    <CardDescription>
                      Crystal systems and lattice parameters from X-ray diffraction. Values in Ångströms (Å).
                    </CardDescription>
                  </CardHeader>
                  <DataTable
                    columns={[
                      { key: "polymer", header: "Polymer" },
                      { key: "system", header: "Crystal System" },
                      { key: "a", header: "a (Å)", numeric: true },
                      { key: "b", header: "b (Å)", numeric: true },
                      { key: "c", header: "c (Å)", numeric: true },
                      { key: "spaceGroup", header: "Space Group" },
                    ]}
                    data={crystalStructures}
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
