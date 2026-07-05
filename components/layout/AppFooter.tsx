import Link from "next/link";
import { AsapLogo } from "@/components/asap/layout/AsapLogo";

export function AppFooter() {
  return (
    <footer className="w-full py-xl px-gutter flex flex-col md:flex-row justify-between items-center border-t border-white/10 bg-background z-10 shrink-0">
      <div className="mb-gutter md:mb-0">
        <AsapLogo href="/" size="sm" />
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
          © 2024 ASAP AI Video Platform. All rights reserved.
        </p>
      </div>
      <div className="flex gap-md">
        {["Privacy Policy", "Terms of Service", "API Docs", "Contact"].map(
          (label) => (
            <Link
              key={label}
              href="#"
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {label}
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
