"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, USER_AVATAR } from "@/lib/constants/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen py-md px-sm bg-surface-container-low border-r border-white/5 w-72 shrink-0 z-40 shadow-md shadow-primary/5">
      <div className="px-sm mb-lg">
        <h1 className="font-headline-md text-headline-md font-extrabold text-primary tracking-tighter">
          ASAP AI
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
          Pro Plan
        </p>
      </div>

      <Link
        href="/editor"
        className="mx-sm mb-lg flex items-center justify-center gap-xs bg-gradient-to-r from-primary-container to-secondary-container py-3 rounded-xl font-bold text-white shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all active:scale-95"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add_circle
        </span>
        Create New Video
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-sm px-md py-3 transition-all rounded-lg active:scale-[0.98]",
                isActive
                  ? "text-primary font-bold border-r-2 border-primary bg-primary/5"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              )}
            >
              <span
                className="material-symbols-outlined"
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-md space-y-1 border-t border-white/5">
        <Link
          href="#"
          className="flex items-center gap-sm px-md py-3 text-on-surface-variant hover:bg-white/5 transition-all rounded-lg"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm text-label-sm">Settings</span>
        </Link>
        <div className="flex items-center gap-sm px-md py-3 mt-xs">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high ring-1 ring-white/20 relative">
            <Image
              src={USER_AVATAR}
              alt="Alex Rivera"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-label-sm text-[10px] leading-tight">Alex Rivera</p>
            <p className="text-[9px] text-on-surface-variant">Admin</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant text-sm">
            more_vert
          </span>
        </div>
      </div>
    </aside>
  );
}
