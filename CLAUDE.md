# CreatorHQ

SaaS business operating system for independent content creators. Core insight: no tool shows creators their revenue per hour of work invested.

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion, Sonner (toasts), Inter font

## Deployment
- Platform: Vercel
- URL: https://creator-hq.vercel.app
- PWA support: manifest.json enables mobile install (standalone mode, portrait orientation)
- Favicon: SVG (`/favicon.svg`) — works as PWA icon and browser favicon
- Sitemap: auto-generated via `app/sitemap.ts`
- robots.txt in `public/`

## Design System
- Primary: #7C3AED (electric purple)
- Accent: #F43F5E (coral/rose)
- Text: #0F172A (dark navy), Muted: #64748B
- Background: #FAFAFA, Card: #FFFFFF, Border: #E2E8F0
- Gradients: purple-to-pink (#7C3AED → #EC4899)
- Success: #10B981, Warning: #F59E0B, Error: #EF4444, Info: #3B82F6
- RPH color coding: >$500/hr emerald, $100-500 amber, $50-100 default, <$50 rose

## Conventions
- PascalCase components, kebab-case routes, camelCase utils
- Route groups: (marketing) for landing, (dashboard) for app
- Mock data in lib/mock-data/, types in lib/types/
- shadcn primitives in components/ui/, feature components in feature dirs
- Use `cn()` from lib/utils for conditional classes
- Use `toast` from `sonner` for user feedback on all actions (import: `import { toast } from "sonner"`)
- All interactive buttons must provide feedback (toast, state change, or navigation)
- Spacing: compact/dense dashboard layout — avoid excessive padding
- Mobile: all pages must be accessible from mobile nav
- Forms save to localStorage for demo purposes (no backend persistence)

## Route Map
- `/` — Landing page (marketing route group)
- `/onboarding` — First-time user onboarding flow (multi-step, localStorage)
- `/dashboard` — Revenue overview (main dashboard)
- `/dashboard/revenue-per-hour` — KILLER FEATURE: revenue per hour analysis
- `/dashboard/deals` — Brand deal finder and pipeline
- `/dashboard/taxes` — Tax center (quarterly estimates, deductions)
- `/dashboard/expenses` — Expense tracker
- `/dashboard/settings` — Platform connections and preferences

## Component Patterns
- Forms: use controlled state, toast on submit, clear on success
- Modals: controlled via parent state, always have close mechanism
- Charts: wrap in explicit-height container, Recharts needs "use client"
- Animations: Framer Motion for page transitions, scroll reveals, counters
- SVG Logo: components/shared/logo.tsx — use everywhere for brand consistency
- Toasts: `import { toast } from "sonner"` — use `toast.success()`, `toast.error()`, `toast.info()`
