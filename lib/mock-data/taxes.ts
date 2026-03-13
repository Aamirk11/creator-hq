import { TaxSummary, QuarterlyPayment, Deduction } from "@/lib/types";

export const taxSummary: TaxSummary = {
  ytdIncome: 67430,
  estimatedTax: 16688,
  effectiveRate: 24.8,
  setAsideMonthly: 2100,
};

export const quarterlyPayments: QuarterlyPayment[] = [
  { quarter: "Q2 2025", amount: 3800, dueDate: "2025-06-15", paid: true, paidDate: "2025-06-10" },
  { quarter: "Q3 2025", amount: 4200, dueDate: "2025-09-15", paid: true, paidDate: "2025-09-12" },
  { quarter: "Q4 2025", amount: 4600, dueDate: "2026-01-15", paid: true, paidDate: "2026-01-10" },
  { quarter: "Q1 2026", amount: 4088, dueDate: "2026-04-15", paid: false },
];

export const deductions: Deduction[] = [
  {
    category: "Home Office",
    amount: 3900,
    items: [
      { name: "Rent (dedicated space)", amount: 2880 },
      { name: "Internet (business %)", amount: 1020 },
    ],
  },
  {
    category: "Equipment",
    amount: 2840,
    items: [
      { name: "Camera (Sony ZV-E10)", amount: 800 },
      { name: "Lighting kit", amount: 350 },
      { name: "Microphone", amount: 200 },
      { name: "Ring light", amount: 89 },
      { name: "Other accessories", amount: 1401 },
    ],
  },
  {
    category: "Software & Subscriptions",
    amount: 1428,
    items: [
      { name: "Adobe Creative Cloud", amount: 648 },
      { name: "Canva Pro", amount: 156 },
      { name: "Epidemic Sound", amount: 180 },
      { name: "TubeBuddy", amount: 108 },
      { name: "Later", amount: 216 },
      { name: "Notion", amount: 120 },
    ],
  },
  {
    category: "Contractors",
    amount: 2400,
    items: [{ name: "Video editor (freelance)", amount: 2400 }],
  },
  {
    category: "Education",
    amount: 580,
    items: [
      { name: "Creator conference", amount: 299 },
      { name: "Online courses", amount: 281 },
    ],
  },
  {
    category: "Travel",
    amount: 1200,
    items: [
      { name: "Brand event (NYC)", amount: 800 },
      { name: "Creator meetup (LA)", amount: 400 },
    ],
  },
  {
    category: "Miscellaneous",
    amount: 980,
    items: [
      { name: "Product samples", amount: 720 },
      { name: "Shipping", amount: 260 },
    ],
  },
];
