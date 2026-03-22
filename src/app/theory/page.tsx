"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { EquationBlock } from "@/components/ui/equation-block";
import { Divider } from "@/components/ui/divider";
import { BookOpen, Atom, Layers, Thermometer, ChevronDown, ChevronRight } from "lucide-react";

/* ── Expandable section component ── */
function ExpandableSection({
  icon: Icon,
  title,
  badge,
  color,
  bg,
  children,
}: {
  icon: typeof Atom;
  title: string;
  badge: string;
  color: string;
  bg: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-surface-1 transition-colors"
      >
        <div className={`w-9 h-9 rounded-md ${bg} flex items-center justify-center shrink-0`}>
          <Icon size={18} strokeWidth={1.5} className={color} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">{title}</span>
            <Badge variant="slate">{badge}</Badge>
          </div>
        </div>
        <div className="text-text-tertiary">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border-soft pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function TheoryPage() {
  return (
    <MainLayout title="Theory Hub" subtitle="Crystallization fundamentals">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-gradient-to-br from-indigo-50 via-surface-0 to-slate-50 border border-border-soft p-6">
          <h1 className="text-xl font-medium text-text-primary mb-1">
            Polymer Crystallization Theory
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl">
            Core theoretical frameworks for understanding semicrystalline polymer structure,
            nucleation, growth, and thermodynamics. Click each topic to expand.
          </p>
        </div>

        {/* ── NUCLEATION THEORY ── */}
        <ExpandableSection
          icon={Atom}
          title="Nucleation Theory"
          badge="Fundamentals"
          color="text-indigo-400"
          bg="bg-indigo-50"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Crystallization begins with nucleation — the formation of small ordered regions (nuclei)
                within the disordered polymer melt. Two distinct mechanisms exist:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-1">Primary Nucleation</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Spontaneous formation of new crystalline nuclei. Can be <strong>homogeneous</strong> (from
                  the melt itself at large undercoolings, ΔT {">"} 50–100°C) or <strong>heterogeneous</strong> (on
                  foreign surfaces like dust, pigments, or nucleating agents at lower ΔT). Heterogeneous
                  nucleation dominates in industrial processing due to lower free energy barriers.
                </p>
              </div>
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-1">Secondary Nucleation</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Deposition of new polymer stems on an existing crystal growth face. This is the
                  rate-limiting step in crystal growth and is described by Hoffman-Lauritzen theory.
                  The chain must overcome a free energy barrier to deposit a new stem of width <em>a₀</em> and
                  fold length <em>l</em> on the crystal substrate.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Classical Nucleation Theory — Free Energy Barrier
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                The free energy change for forming a cylindrical nucleus of radius r and height h:
              </p>
              <EquationBlock latex="\Delta G = -\pi r^2 h \cdot \Delta G_v + 2\pi r h \cdot \sigma + 2\pi r^2 \cdot \sigma_e" />
              <p className="text-xs text-text-tertiary">
                ΔG_v = bulk free energy of fusion per unit volume, σ = lateral surface free energy,
                σ_e = fold (end) surface free energy. A critical nucleus size r* exists where ∂ΔG/∂r = 0.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Critical Nucleus Size
              </h4>
              <EquationBlock latex="r^* = \frac{2\sigma}{\Delta G_v}, \qquad \Delta G^* = \frac{16\pi\sigma^2\sigma_e}{\Delta G_v^2}" />
              <p className="text-xs text-text-tertiary">
                The nucleation rate I is proportional to exp(−ΔG*/k_BT). Higher undercooling → smaller r* → faster nucleation.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Turnbull-Fisher Nucleation Rate
              </h4>
              <EquationBlock latex="I = I_0 \exp\!\left(\frac{-U^*}{R(T - T_\infty)}\right) \exp\!\left(\frac{-\Delta G^*}{k_B T}\right)" />
              <p className="text-xs text-text-tertiary">
                The first exponential accounts for chain transport (diffusion), and the second for the
                thermodynamic barrier to forming a critical nucleus.
              </p>
            </div>
          </div>
        </ExpandableSection>

        {/* ── LAMELLAR STRUCTURE ── */}
        <ExpandableSection
          icon={Layers}
          title="Lamellar Structure & Chain Folding"
          badge="Morphology"
          color="text-sage-400"
          bg="bg-sage-50"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Semicrystalline polymers form thin plate-like crystals called lamellae. The polymer chain
                traverses the crystal, folds at the surface, and re-enters. Typical lamellar thickness
                is 5–50 nm, far less than the fully extended chain length, implying chain folding.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-1">Adjacent Re-entry Model</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Chains fold sharply at the crystal surface and re-enter the same crystal in an adjacent
                  position. Produces regular, tight folds. Observed in solution-grown single crystals
                  (e.g., PE single crystals from dilute xylene solutions).
                </p>
              </div>
              <div className="bg-surface-1 rounded-md p-4">
                <h5 className="text-xs font-medium text-text-primary mb-1">Switchboard Model</h5>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Chains exit and re-enter the crystal randomly, creating an irregular fold surface with
                  loops, ties, and cilia. More representative of melt-crystallized polymers. Tie molecules
                  connecting adjacent lamellae are critical for mechanical properties.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Lamellar Stacking & Long Period
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                Lamellae stack with amorphous layers in between, creating a periodic structure
                measurable by SAXS. The long period L is the sum of crystalline (l_c) and amorphous (l_a) thickness:
              </p>
              <EquationBlock latex="L = l_c + l_a" />
              <EquationBlock latex="X_{c,\text{linear}} = \frac{l_c}{L}" />
              <p className="text-xs text-text-tertiary">
                SAXS gives L from Bragg&#39;s law: L = 2π/q*. Combined with bulk crystallinity
                from DSC or WAXS, one can extract l_c and l_a independently.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Spherulitic Morphology
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                In melt crystallization, lamellae radiate outward from a central nucleus forming
                spherulites — spherical superstructures visible under polarized light microscopy (PLM).
                They grow radially until impinging with neighboring spherulites, producing a characteristic
                Maltese cross pattern under crossed polars. Spherulite radial growth rate G is constant
                at a given isothermal crystallization temperature.
              </p>
            </div>
          </div>
        </ExpandableSection>

        {/* ── EQUILIBRIUM MELTING POINT ── */}
        <ExpandableSection
          icon={Thermometer}
          title="Equilibrium Melting Point"
          badge="Thermodynamics"
          color="text-sand-400"
          bg="bg-sand-50"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                The equilibrium melting temperature T°m is the melting point of an infinitely thick,
                perfect crystal with no surface effects. It cannot be measured directly because real
                polymer crystals always have finite lamellar thickness. T°m is a fundamental parameter
                needed to calculate undercooling (ΔT = T°m − Tc) in all crystallization kinetics models.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Thomson-Gibbs Equation
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                Relates the observed melting temperature to lamellar thickness:
              </p>
              <EquationBlock latex="T_m = T_m^0 \left(1 - \frac{2\sigma_e}{\Delta h_f \cdot l}\right)" />
              <p className="text-xs text-text-tertiary">
                σ_e = fold surface free energy (J/m²), Δh_f = heat of fusion per unit volume (J/m³),
                l = lamellar thickness (m). Thinner lamellae melt at lower temperatures.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Hoffman-Weeks Extrapolation
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                Practical method to determine T°m. Plot observed Tm vs crystallization temperature Tc
                for isothermally crystallized samples. The intersection with Tm = Tc gives T°m:
              </p>
              <EquationBlock latex="T_m = T_m^0 \left(1 - \frac{1}{\gamma}\right) + \frac{T_c}{\gamma}" />
              <p className="text-xs text-text-tertiary">
                γ = lamellar thickening factor (l/l*). For γ = 1 (no thickening), Tm = Tc, which is the
                equilibrium condition. Typical γ values: 1.5–3 for common polymers.
              </p>
            </div>

            <Divider className="my-4" />

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Reference T°m Values
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { polymer: "PE", tm: "141.5°C" },
                  { polymer: "iPP", tm: "186.1°C" },
                  { polymer: "PET", tm: "280°C" },
                  { polymer: "PLA", tm: "207°C" },
                  { polymer: "PA6", tm: "233°C" },
                  { polymer: "PVDF", tm: "210°C" },
                  { polymer: "PEEK", tm: "395°C" },
                  { polymer: "PCL", tm: "78°C" },
                ].map((p) => (
                  <div key={p.polymer} className="bg-surface-1 rounded-sm p-2.5 text-center">
                    <div className="text-xs font-medium text-text-primary">{p.polymer}</div>
                    <div className="text-sm font-mono text-text-secondary mt-0.5">{p.tm}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExpandableSection>

        {/* ── REGIME THEORY ── */}
        <ExpandableSection
          icon={BookOpen}
          title="Hoffman-Lauritzen Regime Theory"
          badge="Kinetics"
          color="text-slate-400"
          bg="bg-slate-50"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">Overview</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                The Hoffman-Lauritzen (HL) theory describes crystal growth rate G as a function of
                crystallization temperature. It identifies the competition between secondary nucleation
                (depositing new stems on the growth face) and surface spreading (lateral growth of a
                deposited layer).
              </p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Growth Rate Equation
              </h4>
              <EquationBlock latex="G = G_0 \exp\!\left(\frac{-U^*}{R(T_c - T_\infty)}\right) \exp\!\left(\frac{-K_g}{T_c \, \Delta T \, f}\right)" />
              <div className="bg-surface-1 rounded-md p-4 mt-2">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>G₀</strong> = pre-exponential factor<br />
                  <strong>U*</strong> = activation energy for chain transport across the melt-crystal interface (typically 6,280 J/mol for WLF, or 1,500 J/mol for Arrhenius-like)<br />
                  <strong>T∞</strong> = temperature below which chain motion ceases (≈ Tg − 30K)<br />
                  <strong>Kg</strong> = nucleation constant, depends on regime<br />
                  <strong>ΔT</strong> = undercooling = T°m − Tc<br />
                  <strong>f</strong> = correction factor = 2Tc / (T°m + Tc)
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                The Three Regimes
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-1 rounded-md p-4">
                  <Badge variant="indigo" className="mb-2">Regime I</Badge>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <strong>Low undercooling.</strong> Nucleation rate i is very low compared to spreading rate g.
                    Each new layer is completed before the next nucleus forms. Growth face is smooth.
                    K_g^I = 4b₀σσ_eT°m / (Δh_f · k_B).
                  </p>
                </div>
                <div className="bg-surface-1 rounded-md p-4">
                  <Badge variant="sand" className="mb-2">Regime II</Badge>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <strong>Moderate undercooling.</strong> Multiple nuclei form on the growth face before
                    spreading is complete. Both i and g contribute. K_g^{"{II}"} = 2b₀σσ_eT°m / (Δh_f · k_B).
                    Note: K_g^I / K_g^{"{II}"} = 2.
                  </p>
                </div>
                <div className="bg-surface-1 rounded-md p-4">
                  <Badge variant="rose" className="mb-2">Regime III</Badge>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    <strong>High undercooling.</strong> Prolific nucleation — every stem deposited acts as
                    a new nucleus. K_g^{"{III}"} = K_g^I. Growth face is rough. Produces smaller, less
                    perfect crystals.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-text-primary uppercase tracking-wider mb-2">
                Lauritzen-Hoffman Plot
              </h4>
              <p className="text-xs text-text-secondary mb-2">
                To determine K_g, plot ln(G) + U*/R(Tc − T∞) vs 1/(Tc · ΔT · f).
                The slope gives −K_g. Regime transitions appear as slope changes:
              </p>
              <EquationBlock latex="\ln G + \frac{U^*}{R(T_c - T_\infty)} = \ln G_0 - \frac{K_g}{T_c \cdot \Delta T \cdot f}" />
            </div>
          </div>
        </ExpandableSection>

        {/* ── KEY EQUATIONS (Avrami section) ── */}
        <Card>
          <CardHeader>
            <CardTitle>Avrami Kinetics</CardTitle>
            <CardDescription>Overall crystallization kinetics — isothermal and extended models</CardDescription>
          </CardHeader>

          <Tabs
            tabs={[
              {
                id: "classical",
                label: "Classical Avrami",
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The Avrami equation describes the evolution of relative crystallinity X(t)
                      during isothermal crystallization. It assumes constant nucleation and growth rates
                      with random spatial distribution of nuclei.
                    </p>
                    <EquationBlock latex="X(t) = 1 - \exp\!\left(-k \, t^n\right)" />
                    <div className="bg-surface-1 rounded-md p-4">
                      <p className="text-xs text-text-secondary leading-relaxed">
                        <strong>k</strong> = overall crystallization rate constant (contains nucleation rate and growth rate information)<br />
                        <strong>n</strong> = Avrami exponent (reflects nucleation type and growth dimensionality)<br />
                      </p>
                      <Divider className="my-2" />
                      <p className="text-xs text-text-secondary">
                        <strong>Avrami exponent interpretation:</strong><br />
                        n = 1: rod-like growth, athermal nucleation<br />
                        n = 2: disk-like (2D) growth with athermal nucleation, or rod-like with thermal nucleation<br />
                        n = 3: spherulitic (3D) growth with athermal nucleation, or disk-like with thermal nucleation<br />
                        n = 4: spherulitic (3D) growth with thermal (sporadic) nucleation
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Half-time of Crystallization</h4>
                      <EquationBlock latex="t_{1/2} = \left(\frac{\ln 2}{k}\right)^{1/n}" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Linearized Form (Avrami Plot)</h4>
                      <EquationBlock latex="\ln\!\left[-\ln\!\left(1 - X(t)\right)\right] = \ln k + n \ln t" />
                      <p className="text-xs text-text-tertiary">
                        Plot ln[−ln(1−X)] vs ln(t): slope = n, intercept = ln(k). Deviations from
                        linearity at high conversion indicate secondary crystallization.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                id: "extended",
                label: "Extended Avrami",
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The classical Avrami equation assumes constant conditions throughout crystallization.
                      Several extended formulations address real-world deviations:
                    </p>

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Two-Stage Avrami (Secondary Crystallization)</h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Many polymers show a two-stage process: primary (rapid) and secondary (slow, perfection/infilling).
                      </p>
                      <EquationBlock latex="X(t) = X_p\!\left[1 - e^{-k_1 t^{n_1}}\right] + (1-X_p)\!\left[1 - e^{-k_2 t^{n_2}}\right]" />
                      <p className="text-xs text-text-tertiary">
                        X_p = fraction from primary crystallization, k₁/n₁ and k₂/n₂ are Avrami
                        parameters for primary and secondary stages.
                      </p>
                    </div>

                    <Divider className="my-2" />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Tobin Modification</h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Accounts for impingement of growing crystallites without the phantom nuclei assumption:
                      </p>
                      <EquationBlock latex="X(t) = \frac{k_T \, t^{n_T}}{1 + k_T \, t^{n_T}}" />
                    </div>

                    <Divider className="my-2" />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Malkin Model</h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Separates nucleation and growth contributions explicitly:
                      </p>
                      <EquationBlock latex="X(t) = 1 - \frac{C_0 + 1}{C_0 + \exp(C_1 \, t)}" />
                      <p className="text-xs text-text-tertiary">
                        C₀ relates to the ratio of growth to nucleation rates, C₁ is the overall
                        crystallization rate.
                      </p>
                    </div>

                    <Divider className="my-2" />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Ozawa (Non-isothermal)</h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Extension of Avrami for constant cooling rate experiments:
                      </p>
                      <EquationBlock latex="X(T) = 1 - \exp\!\left(\frac{-K(T)}{\phi^m}\right)" />
                      <p className="text-xs text-text-tertiary">
                        K(T) = Ozawa crystallization function (temperature-dependent), ϕ = cooling rate (°C/min),
                        m = Ozawa exponent. Valid only if crystallization mechanism doesn't change with cooling rate.
                      </p>
                    </div>

                    <Divider className="my-2" />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Mo Method (Combined Avrami-Ozawa)</h4>
                      <p className="text-xs text-text-secondary mb-2">
                        Combines Avrami and Ozawa at a given relative crystallinity:
                      </p>
                      <EquationBlock latex="\ln \phi = \frac{1}{a}\ln K(T) - \frac{n}{a}\ln t = F(T) - b \ln t" />
                      <p className="text-xs text-text-tertiary">
                        F(T) = value of ln(ϕ) at unit crystallization time; higher F(T) means
                        a faster cooling rate is needed to reach a given crystallinity, i.e., more difficult crystallization.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                id: "activation",
                label: "Activation Energy",
                content: (
                  <div className="space-y-4">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      The effective activation energy of non-isothermal crystallization quantifies
                      the temperature dependence of the crystallization rate.
                    </p>

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Kissinger Method</h4>
                      <EquationBlock latex="\ln\!\left(\frac{\phi}{T_p^2}\right) = \text{const} - \frac{E_a}{R \, T_p}" />
                      <p className="text-xs text-text-tertiary">
                        Plot ln(ϕ/Tp²) vs 1/Tp for different cooling rates ϕ.
                        Slope = −E_a/R. Tp = peak crystallization temperature.
                      </p>
                    </div>

                    <Divider className="my-2" />

                    <div>
                      <h4 className="text-xs font-medium text-text-primary mb-2">Friedman Isoconversional Method</h4>
                      <EquationBlock latex="\ln\!\left(\frac{dX}{dt}\right)_{X} = \text{const} - \frac{E_a(X)}{R \, T}" />
                      <p className="text-xs text-text-tertiary">
                        Determines E_a as a function of relative crystallinity X. Advantage: no assumption
                        about the crystallization model. Reveals whether mechanism changes during crystallization.
                      </p>
                    </div>
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
