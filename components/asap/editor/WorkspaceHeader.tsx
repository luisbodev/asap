"use client";

import React from "react";
import { Folder, Share2, UploadCloud, ChevronRight, Laptop } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

interface WorkspaceHeaderProps {
  project: ProjectInfo;
  onExportClick: () => void;
  onShareClick: () => void;
  lang: "es" | "en";
}

export default function WorkspaceHeader({ project, onExportClick, onShareClick, lang }: WorkspaceHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#131b2e]/50 backdrop-blur-md z-10 shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2 text-[#cbc3d7] text-sm font-semibold select-none">
          <Folder size={18} className="text-[#cbc3d7]/80" />
          <span>{lang === "es" ? "Proyectos" : "Projects"}</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-white truncate font-bold">{project.name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded bg-[#d0bcff]/10 text-[#d0bcff] font-bold text-[10px] border border-[#d0bcff]/20 uppercase tracking-wider">
            {project.quality} | {project.fps}FPS
          </span>
          <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/10 text-[#4cd7f6] font-bold text-[10px] border border-[#4cd7f6]/20 uppercase tracking-wider">
            {project.resolution === "16:9" 
              ? (lang === "es" ? "Horizontal (16:9)" : "Landscape (16:9)") 
              : project.resolution === "9:16" 
                ? (lang === "es" ? "Vertical (9:16)" : "Portrait (9:16)") 
                : (lang === "es" ? "Cuadrado (1:1)" : "Square (1:1)")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={onShareClick}
          className="px-4 py-2 flex items-center gap-2 rounded-lg border border-white/10 hover:bg-white/5 active:bg-white/10 text-white transition-all text-xs font-bold cursor-pointer"
        >
          <Share2 size={16} />
          <span>{lang === "es" ? "Compartir Enlace" : "Share Link"}</span>
        </button>
        <button 
          onClick={onExportClick}
          className="px-4 py-2 flex items-center gap-2 rounded-lg bg-[#4cd7f6] text-[#001f26] font-bold hover:scale-[1.02] active:scale-95 transition-all text-xs cursor-pointer shadow-md shadow-[#4cd7f6]/20"
        >
          <UploadCloud size={16} />
          <span>{lang === "es" ? "Exportar Video" : "Export Video"}</span>
        </button>
      </div>
    </header>
  );
}
