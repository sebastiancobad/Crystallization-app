# PolymerCryst

A research platform and design system for polymer crystallization studies. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Overview

PolymerCryst provides a comprehensive UI toolkit tailored for polymer science research — from DSC thermal analysis to SAXS/WAXS structural characterization. The design system uses a soft, academic-inspired aesthetic with pastel color ramps and generous whitespace.

### Live Preview

Visit `/showcase` to see every component rendered with real polymer science data and equations.

## Tech Stack

- **Framework**: Next.js 16.2 (Turbopack)
- **UI**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 with `@theme` design tokens
- **Animation**: Framer Motion 12
- **Charts**: Recharts 3
- **Math**: KaTeX 0.16
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app, or [http://localhost:3000/showcase](http://localhost:3000/showcase) for the design system.

## Design System

### 37 Components

| Category | Components |
|----------|-----------|
| **Forms** | Input, Select, Textarea, Checkbox, Toggle, RadioGroup, SearchInput, Button |
| **Feedback** | Alert, Modal, Toast, Tooltip, Spinner, ProgressBar, Skeleton, EmptyState |
| **Data Display** | DataTable, Badge, Avatar, Card, MetricCard, FeatureCard, Kbd |
| **Navigation** | Sidebar, Tabs, Breadcrumb, Dropdown, Pagination |
| **Overlay** | Modal, Dropdown, Popover, Toast |
| **Disclosure** | Accordion, Tabs |
| **Layout** | MainLayout, Divider |
| **Specialized** | EquationBlock (KaTeX), UploadZone, SimpleAreaChart, SimpleBarChart |

### Design Tokens

Seven pastel color ramps defined via CSS custom properties in `@theme`:

- **Indigo** — Primary actions, active states
- **Sage** — Success, biopolymer tags
- **Rose** — Error, destructive actions
- **Sand** — Warning, SAXS/WAXS tags
- **Slate** — Info, neutral states
- **Teal** — Simulation, secondary highlights
- **Lavender** — SSA module, tertiary accents

Four semantic surfaces (`canvas`, `surface-0/1/2`), three border levels, and four shadow scales.

### Accessibility

All components follow WCAG 2.1 guidelines:

- Proper ARIA roles and attributes (`role="dialog"`, `aria-expanded`, `aria-controls`, etc.)
- Keyboard navigation (arrow keys for tabs/radio/dropdowns, Escape to dismiss, focus trapping in modals)
- `aria-invalid` + `aria-describedby` on form controls with error states
- `aria-current="page"` on active navigation items
- `role="alert"` for error messages, `role="status"` for loading indicators

### Motion

Eight animation presets in `src/lib/motion.ts`:
- `fadeUp`, `fadeIn`, `scaleIn`, `slideInRight`, `slideInLeft`
- `stagger` (orchestration), `cardLift`, `scalePress` (interaction)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens
│   ├── layout.tsx           # Root layout with ToastProvider
│   ├── page.tsx             # Landing page
│   └── showcase/page.tsx    # Design system showcase
├── components/
│   ├── charts/              # Recharts wrappers
│   ├── layout/              # MainLayout (sidebar + content)
│   └── ui/                  # 37 UI components + barrel export
└── lib/
    ├── motion.ts            # Framer Motion presets
    └── utils.ts             # cn() class merging utility
```

## Deploy

### Vercel (Recommended)

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Select the branch and click **Deploy**

Or via CLI:

```bash
npx vercel --prod
```

## Scientific Context

The showcase includes real polymer crystallization data:

- **Equations**: Gibbs–Thomson free energy, DSC-based crystallinity (Xc), Avrami/Ozawa/Lauritzen–Hoffman kinetic models
- **Sample data**: HDPE, iPP, PLA, PET, PCL with literature-accurate Tm, Tc, and Xc values
- **Characterization methods**: DSC, SAXS, WAXS, SSA, PLM

## License

Private repository.
