import { Expense, Subscription } from "@/lib/types";

export const expenses: Expense[] = [
  { id: "exp-1", name: "Ring Light Pro", amount: 89, category: "equipment", date: "2026-03-02", deductible: true, recurring: false },
  { id: "exp-2", name: "SD Card 256GB", amount: 45, category: "equipment", date: "2026-02-15", deductible: true, recurring: false },
  { id: "exp-3", name: "Skincare samples for review", amount: 120, category: "misc", date: "2026-03-08", deductible: true, recurring: false },
  { id: "exp-4", name: "Home office internet", amount: 85, category: "home-office", date: "2026-03-01", deductible: true, recurring: true },
  { id: "exp-5", name: "Home office rent portion", amount: 240, category: "home-office", date: "2026-03-01", deductible: true, recurring: true },
  { id: "exp-6", name: "Video editor (freelance)", amount: 200, category: "contractors", date: "2026-03-05", deductible: true, recurring: true },
  { id: "exp-7", name: "Backdrop stand", amount: 35, category: "equipment", date: "2026-01-20", deductible: true, recurring: false },
  { id: "exp-8", name: "Creator conference ticket", amount: 299, category: "education", date: "2026-02-28", deductible: true, recurring: false },
  { id: "exp-9", name: "Phone tripod mount", amount: 22, category: "equipment", date: "2026-01-10", deductible: true, recurring: false },
  { id: "exp-10", name: "Shipping for PR packages", amount: 45, category: "misc", date: "2026-02-20", deductible: true, recurring: false },
];

export const subscriptions: Subscription[] = [
  { id: "sub-1", name: "Adobe Creative Cloud", amount: 54, billingCycle: "monthly", category: "software", nextBilling: "2026-04-01", active: true },
  { id: "sub-2", name: "Canva Pro", amount: 13, billingCycle: "monthly", category: "software", nextBilling: "2026-04-05", active: true },
  { id: "sub-3", name: "Epidemic Sound", amount: 15, billingCycle: "monthly", category: "software", nextBilling: "2026-04-10", active: true },
  { id: "sub-4", name: "TubeBuddy Pro", amount: 9, billingCycle: "monthly", category: "software", nextBilling: "2026-04-15", active: true },
  { id: "sub-5", name: "Later (social scheduler)", amount: 18, billingCycle: "monthly", category: "software", nextBilling: "2026-04-01", active: true },
  { id: "sub-6", name: "Notion (workspace)", amount: 10, billingCycle: "monthly", category: "software", nextBilling: "2026-04-01", active: true },
];
