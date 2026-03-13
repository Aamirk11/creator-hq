import Link from "next/link";
import { GradientText } from "@/components/shared";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Revenue/Hour", href: "/dashboard/revenue-per-hour" },
      { label: "Brand Deals", href: "/dashboard/deals" },
      { label: "Tax Center", href: "/dashboard/taxes" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      {
        label: "Twitter",
        href: "https://twitter.com/creatorhq",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/creatorhq",
        external: true,
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@creatorhq",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top section: brand + columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <GradientText className="text-lg font-bold">
              CreatorHQ
            </GradientText>
            <p className="mt-2 max-w-xs text-sm text-[#64748B]">
              The business operating system for independent content creators.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white">
                {column.title}
              </h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#64748B] transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#64748B] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1E293B] pt-6">
          <p className="text-center text-xs text-[#64748B]">
            &copy; 2026 CreatorHQ. Built for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
