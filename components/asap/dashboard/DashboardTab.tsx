"use client";

import React from "react";
import { Film, Users, Video, Clock, Share2, Plus, Sparkles, CheckCircle, TrendingUp } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

interface DashboardTabProps {
  projects: ProjectInfo[];
  currentProject: ProjectInfo;
  onSelectProject: (proj: ProjectInfo) => void;
  onNewVideoClick: () => void;
  lang?: "es" | "en";
}

export default function DashboardTab({
  projects,
  currentProject,
  onSelectProject,
  onNewVideoClick,
  lang = "es",
}: DashboardTabProps) {
  // Translations
  const t = {
    es: {
      welcome: "¡Bienvenido de nuevo, Alex Rivera!",
      heroSub: "Nuestro motor de IA ha escaneado las tendencias virales actuales. Encontramos 3 nuevas pistas de audio y transiciones de edición que coinciden con tu estilo. Selecciona un proyecto a continuación o inicia un nuevo espacio de trabajo.",
      createBtn: "Crear Nuevo Video",
      activeProj: "Proyecto Activo",
      activeProjSub: "Editando perfil estándar",
      viralRating: "Puntaje de Viralidad",
      viralSub: "Se espera un alto engagement",
      totalExports: "Exportaciones Totales",
      exportsSub: "YouTube, Instagram y TikTok",
      switchProj: "Cambiar / Seleccionar Archivo de Proyecto",
      filesAvailable: "Archivos Disponibles",
      activeWorkspace: "ESPACIO DE TRABAJO ACTIVO",
      style: "Estilo",
      duration: "Duración",
      connectionsTitle: "Conexiones de Cuentas de Redes Sociales",
      connectionsSub: "Publica o programa directamente en tus plataformas con recomendaciones de metadatos optimizadas por IA.",
      activeConn: "Conexión Activa",
      reach: "Alcance",
      subscribers: "Suscriptores",
    },
    en: {
      welcome: "Welcome back, Alex Rivera!",
      heroSub: "Our AI engine has scanned current viral social trends. We found 3 new audio cues and editing transitions matching your style. Select a project below or launch a new workspace.",
      createBtn: "Create New Video",
      activeProj: "Active Project",
      activeProjSub: "Editing standard profile",
      viralRating: "Viral Rating Score",
      viralSub: "High engagement expected",
      totalExports: "Total Social Exports",
      exportsSub: "YouTube, Instagram & TikTok",
      switchProj: "Switch / Select Project File",
      filesAvailable: "Files Available",
      activeWorkspace: "ACTIVE WORKSPACE",
      style: "Style",
      duration: "Duration",
      connectionsTitle: "Social Media Account Connections",
      connectionsSub: "Publish or schedule directly to your platforms with optimized metadata recommendations.",
      activeConn: "Active Connection",
      reach: "Reach",
      subscribers: "Subscribers",
    }
  }[lang];

  // Mock Connected Accounts / general stats
  const stats = [
    { label: t.activeProj, value: currentProject.name, sub: t.activeProjSub, icon: Film, color: "text-[#d0bcff]" },
    { label: t.viralRating, value: "96.4%", sub: t.viralSub, icon: TrendingUp, color: "text-[#4cd7f6]" },
    { label: t.totalExports, value: "34 Clips", sub: t.exportsSub, icon: Video, color: "text-[#ffb2b7]" },
  ];

  const connectedAccounts = [
    { platform: "TikTok", handle: "@alexrivera_vlogs", status: t.activeConn, reach: `142K ${t.reach}` },
    { platform: "Instagram Reels", handle: "@alex_rivera_travels", status: t.activeConn, reach: `98K ${t.reach}` },
    { platform: "YouTube Shorts", handle: "Alex Rivera Travels", status: t.activeConn, reach: `310K ${t.subscribers}` },
  ];

  return (
    <div id="dashboard-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 select-none">
      
      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-[#171f33] to-[#2d3449] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a078ff]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-md text-2xl font-extrabold text-white">
              {t.welcome}
            </h1>
            <p className="text-[#cbc3d7]/80 text-sm mt-1 max-w-xl leading-relaxed">
              {t.heroSub}
            </p>
          </div>
          <button 
            onClick={onNewVideoClick}
            className="px-4 py-2.5 bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#d0bcff]/20 shrink-0"
          >
            <Plus size={16} />
            <span>{t.createBtn}</span>
          </button>
        </div>
      </div>

      {/* Analytics stats dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#171f33] p-5 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg shadow-black/25">
              <div className="space-y-1 min-w-0 flex-1 pr-2">
                <span className="text-[11px] uppercase tracking-wider text-[#cbc3d7]/60 font-bold font-mono">{stat.label}</span>
                <p className="text-xl font-extrabold text-white truncate">{stat.value}</p>
                <p className="text-xs text-[#cbc3d7]/80 truncate">{stat.sub}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects selection section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Film size={18} className="text-[#d0bcff]" />
            <span>{t.switchProj}</span>
          </h2>
          <span className="text-xs text-[#cbc3d7] font-medium">{projects.length} {lang === "es" ? "Archivos Disponibles" : "Files Available"}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const isCurrent = proj.id === currentProject.id;
            return (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-40 ${
                  isCurrent 
                    ? "bg-[#131b2e]/60 border-[#d0bcff] shadow-[0_0_15px_rgba(208,188,255,0.15)]" 
                    : "bg-[#171f33] border-white/5 hover:border-white/20 hover:bg-[#222a3d]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider font-mono">
                      {proj.quality} | {proj.fps}FPS
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded bg-[#d0bcff]/10 text-[#d0bcff] font-bold text-[9px] border border-[#d0bcff]/20">
                        {t.activeWorkspace}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">{proj.name}</h3>
                  <p className="text-xs text-[#cbc3d7]/80 mt-1 truncate">
                    {t.style}: {proj.editingStyle}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                  <span className="text-xs font-mono text-[#cbc3d7]">
                    {t.duration}: {Math.floor(proj.durationSeconds / 60)}:{(proj.durationSeconds % 60).toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs text-[#cbc3d7]/60">
                    {proj.resolution === "16:9" ? (lang === "es" ? "Horizontal 16:9" : "Landscape 16:9") : (lang === "es" ? "Vertical 9:16" : "Portrait 9:16")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected Channels & Accounts */}
      <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Share2 size={16} className="text-[#4cd7f6]" />
            <span>{t.connectionsTitle}</span>
          </h2>
          <p className="text-xs text-[#cbc3d7]/80 mt-1">
            {t.connectionsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectedAccounts.map((acc, idx) => (
            <div key={idx} className="bg-[#0b1326] p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block truncate">{acc.platform}</span>
                <span className="text-xs text-[#cbc3d7] block truncate mt-0.5">{acc.handle}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-green-400 font-mono">{acc.status}</span>
                </div>
              </div>
              <div className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-bold text-[#4cd7f6] shrink-0 font-mono">
                {acc.reach}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
