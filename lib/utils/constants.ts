export const APP_NAME = "CreatorHQ";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Revenue/Hour", href: "/dashboard/revenue-per-hour", icon: "Clock" },
  { label: "Brand Deals", href: "/dashboard/deals", icon: "Handshake" },
  { label: "Taxes", href: "/dashboard/taxes", icon: "Receipt" },
  { label: "Expenses", href: "/dashboard/expenses", icon: "CreditCard" },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "$/Hour", href: "/dashboard/revenue-per-hour", icon: "Clock" },
  { label: "Deals", href: "/dashboard/deals", icon: "Handshake" },
  { label: "Taxes", href: "/dashboard/taxes", icon: "Receipt" },
  { label: "More", href: "/dashboard/expenses", icon: "Menu" },
] as const;

export const PRICING_TIERS = [
  {
    name: "Free",
    price: 0,
    description: "Get started with basic tracking",
    features: [
      "2 platform connections",
      "Basic revenue dashboard",
      "Monthly reports",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For serious creators who want to grow",
    features: [
      "Unlimited platforms",
      "Revenue Per Hour tracking",
      "Brand deal finder",
      "Tax center & deductions",
      "Expense tracking",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: 49,
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom reports & exports",
      "API access",
      "Dedicated account manager",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
] as const;
