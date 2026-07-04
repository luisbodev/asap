"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Calendar,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Settings,
  HelpCircle,
  PlusCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useAppDemo } from "@/context/AppDemoContext";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { href: "/dashboard", labelEs: "Dashboard", labelEn: "Dashboard", icon: LayoutDashboard },
  { href: "/editor", labelEs: "Editor", labelEn: "Editor", icon: Film },
  { href: "/scheduler", labelEs: "Calendario", labelEn: "Scheduler", icon: Calendar },
  { href: "/comments", labelEs: "Comentarios", labelEn: "Comments", icon: MessageSquare },
  { href: "/analytics", labelEs: "Métricas", labelEn: "Analytics", icon: BarChart3 },
  { href: "/trends", labelEs: "Tendencias", labelEn: "Trends", icon: TrendingUp },
];

const FOOTER_NAV = [
  { href: "/settings", labelEs: "Ajustes", labelEn: "Settings", icon: Settings },
  { href: "/support", labelEs: "Soporte", labelEn: "Support", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const {
    lang,
    setLang,
    isLoggedIn,
    userProfileName,
    sidebarCollapsed,
    setSidebarCollapsed,
    setShowNewVideoModal,
    handleLogout,
  } = useAppDemo();

  if (sidebarCollapsed) return null;

  return (
    <aside
      id="asap-sidebar"
      className="hidden md:flex flex-col h-screen py-6 px-4 bg-[#131b2e] border-r border-white/5 w-72 shrink-0 shadow-md shadow-[#d0bcff]/5 z-40 transition-all duration-300"
    >
      <div className="mb-10 px-2 select-none flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="font-headline-md text-2xl font-extrabold text-[#d0bcff] tracking-tight">
            ASAP AI
          </Link>
          <p className="font-label-sm text-[12px] text-[#cbc3d7]/60 uppercase tracking-widest mt-1">
            {isLoggedIn
              ? lang === "es"
                ? "Plan Pro"
                : "Pro Plan"
              : lang === "es"
                ? "Modo Demo"
                : "Guest Mode"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSidebarCollapsed(true)}
          title={lang === "es" ? "Ocultar menú lateral" : "Collapse sidebar"}
          className="p-1.5 rounded-lg hover:bg-white/5 text-[#cbc3d7] hover:text-white transition-all cursor-pointer flex items-center justify-center border border-white/5"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowNewVideoModal(true)}
        className="mb-8 w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#a078ff]/20 cursor-pointer text-xs"
      >
        <PlusCircle size={18} />
        <span>{lang === "es" ? "Crear Nuevo Video" : "Create New Video"}</span>
      </button>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {MAIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all group",
                isActive
                  ? "text-[#d0bcff] font-bold border-r-2 border-[#d0bcff] bg-white/5"
                  : "text-[#cbc3d7] hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? "text-[#d0bcff]"
                    : "text-[#cbc3d7] group-hover:text-[#d0bcff] transition-colors"
                }
              />
              <span className="text-sm font-semibold">
                {lang === "es" ? item.labelEs : item.labelEn}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/5 space-y-1">
        {FOOTER_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all group",
                isActive
                  ? "text-[#d0bcff] font-bold border-r-2 border-[#d0bcff] bg-white/5"
                  : "text-[#cbc3d7] hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? "text-[#d0bcff]"
                    : "text-[#cbc3d7] group-hover:text-[#d0bcff] transition-colors"
                }
              />
              <span className="text-sm font-semibold">
                {lang === "es" ? item.labelEs : item.labelEn}
              </span>
            </Link>
          );
        })}

        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5 mb-2 mt-4 text-xs">
          <span className="text-[#cbc3d7] font-semibold text-[11px] uppercase tracking-wider">
            {lang === "es" ? "Idioma" : "Language"}
          </span>
          <div className="flex items-center gap-1 bg-[#0b1326]/50 p-0.5 rounded-md">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "px-2 py-0.5 text-[10px] font-extrabold rounded-sm transition-all cursor-pointer",
                  lang === l
                    ? "bg-[#d0bcff]/20 text-[#d0bcff]"
                    : "text-[#cbc3d7]/60 hover:text-white"
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 px-1 min-w-0">
              <div className="w-10 h-10 rounded-full border border-[#d0bcff]/20 p-0.5 shrink-0 overflow-hidden">
                <img
                  className="w-full h-full rounded-full object-cover"
                  alt={userProfileName}
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-white truncate">{userProfileName}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#d0bcff] font-bold mt-0.5">
                  {isLoggedIn
                    ? lang === "es"
                      ? "Cuenta Pro"
                      : "Pro Account"
                    : lang === "es"
                      ? "Invitado"
                      : "Guest Mode"}
                </span>
              </div>
            </div>
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                title={lang === "es" ? "Cerrar Sesión" : "Log Out"}
                className="p-2 rounded-lg hover:bg-rose-500/10 text-rose-400/80 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
