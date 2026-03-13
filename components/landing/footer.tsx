import Link from "next/link";
import { GradientText } from "@/components/shared";

const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Twitter", href: "https://twitter.com/creatorhq", external: true },
  {
    label: "Instagram",
    href: "https://instagram.com/creatorhq",
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#0F172A] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <GradientText className="text-lg font-bold">CreatorHQ</GradientText>
          <p className="text-xs text-[#64748B]">
            &copy; 2026 CreatorHQ. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#64748B] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#64748B] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
