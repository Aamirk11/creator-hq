# CreatorHQ

SaaS business operating system for independent content creators. Core insight: no tool shows creators their revenue per hour of work invested.

## Stack
- Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion, Inter font

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
- All monetary values stored in cents internally, displayed as dollars

## Route Map
- / — Landing page (marketing)
- /dashboard — Revenue overview
- /dashboard/revenue-per-hour — KILLER FEATURE
- /dashboard/deals — Brand deal finder
- /dashboard/taxes — Tax center
- /dashboard/expenses — Expense tracker
- /dashboard/settings — Platform connections
