"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, RefreshCw, Plus, Flame, CheckCircle } from "lucide-react";
import { AIClip } from "@/types/asap";

interface AIClipsPanelProps {
  clips: AIClip[];
  onAddClipToTimeline: (clip: AIClip) => void;
  onPreviewClipRange: (startTime: number, endTime: number) => void;
  onRegenerateClips: (description: string) => Promise<void>;
  isGenerating: boolean;
  videoDescription: string;
  setVideoDescription: (desc: string) => void;
  lang?: "es" | "en";
}

export default function AIClipsPanel({
  clips,
  onAddClipToTimeline,
  onPreviewClipRange,
  onRegenerateClips,
  isGenerating,
  videoDescription,
  setVideoDescription,
  lang = "es",
}: AIClipsPanelProps) {
  const t = {
    es: {
      title: "Analizador de Clips de IA",
      liveScore: "Puntaje en Vivo",
      transcriptLabel: "Transcripción / Trama del Video",
      editScript: "Editar Guión",
      cancel: "Cancelar",
      updateScan: "Actualizar y Escanear Viralidad",
      noTranscript: "Aún no se ha proporcionado ninguna transcripción.",
      brainstorming: "Buscando sugerencias de IA...",
      noViralClips: "Aún no se han generado clips virales.",
      genSuggestions: "Generar Sugerencias de IA",
      viralScore: "Puntaje",
      addSegment: "Añadir segmento a la pista",
      regenBtn: "Regenerar Sugerencias"
    },
    en: {
      title: "AI Clips Analyzer",
      liveScore: "Live Score",
      transcriptLabel: "Video transcript / plot",
      editScript: "Edit Script",
      cancel: "Cancel",
      updateScan: "Update & Scan Virality",
      noTranscript: "No transcript script provided yet.",
      brainstorming: "Brainstorming AI suggestions...",
      noViralClips: "No viral clips generated yet.",
      genSuggestions: "Generate AI Suggestions",
      viralScore: "Score",
      addSegment: "Add segment to track",
      regenBtn: "Regenerate Suggestions"
    }
  }[lang];

  const [editingScript, setEditingScript] = useState(false);

  const handleRegenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegenerateClips(videoDescription);
    setEditingScript(false);
  };

  return (
    <aside id="ai-clips-panel" className="w-80 border-l border-white/5 bg-[#171f33] flex flex-col shrink-0 overflow-hidden select-none">
      
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="text-[#4cd7f6] animate-pulse" size={18} />
          <span className="font-bold text-sm text-white">{t.title}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#4cd7f6]/10 text-[#4cd7f6] text-[10px] font-bold border border-[#4cd7f6]/20 uppercase tracking-tight">
          {t.liveScore}
        </span>
      </div>

      {/* Description & Video Transcription Script panel */}
      <div className="p-4 bg-[#131b2e]/50 border-b border-white/5 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider">{t.transcriptLabel}</label>
          <button 
            onClick={() => setEditingScript(!editingScript)}
            className="text-[10px] text-[#4cd7f6] hover:underline font-bold"
          >
            {editingScript ? t.cancel : t.editScript}
          </button>
        </div>

        {editingScript ? (
          <form onSubmit={handleRegenSubmit} className="space-y-2">
            <textarea
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              className="w-full h-20 bg-[#060e20] text-xs text-white rounded-lg p-2 border border-[#d0bcff]/30 focus:border-[#d0bcff] outline-none resize-none custom-scrollbar animate-none"
              placeholder="Provide transcription, dialogues, or raw notes..."
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-1.5 rounded bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={12} className={isGenerating ? "animate-spin" : ""} />
              <span>{t.updateScan}</span>
            </button>
          </form>
        ) : (
          <p className="text-xs text-[#cbc3d7]/80 line-clamp-2 leading-relaxed italic">
            &ldquo;{videoDescription || t.noTranscript}&rdquo;
          </p>
        )}
      </div>

      {/* Recommended Clips List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
        {isGenerating ? (
          /* Loading skeleton */
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 animate-pulse">
                <div className="h-28 bg-[#0b1326] rounded-lg mb-2 relative flex items-center justify-center">
                  <RefreshCw className="text-[#d0bcff] animate-spin" size={24} />
                </div>
                <div className="h-4 bg-white/10 rounded w-2/3 mb-1" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : clips.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center p-4">
            <Flame className="text-[#cbc3d7]/30 mb-2" size={32} />
            <p className="text-xs text-[#cbc3d7]">{t.noViralClips}</p>
            <button 
              onClick={() => onRegenerateClips(videoDescription)}
              className="mt-3 text-xs text-[#4cd7f6] font-bold hover:underline"
            >
              {t.genSuggestions}
            </button>
          </div>
        ) : (
          clips.map((clip, index) => {
            // Default elegant social previews
            const defaultThumbs = [
              "https://images.unsplash.com/photo-1518173946687-a4c8a383392c?q=80&w=300&auto=format&fit=crop", // Tropical waterfall
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop", // Beach
              "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop", // Mountains
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300&auto=format&fit=crop"  // Room interior
            ];
            const thumb = clip.thumbnailUrl || defaultThumbs[index % defaultThumbs.length];

            return (
              <div 
                key={index} 
                onClick={() => onPreviewClipRange(clip.startTime, clip.endTime)}
                className="bg-white/5 border border-white/5 rounded-xl p-2.5 hover:border-[#d0bcff]/50 transition-all cursor-pointer group relative"
              >
                {/* Image Frame */}
                <div className="relative rounded-lg overflow-hidden h-28 mb-2">
                  <img 
                    src={thumb} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                    alt={clip.title}
                  />
                  
                  {/* Duration label */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white font-mono backdrop-blur-sm">
                    {clip.endTime - clip.startTime}s ({clip.startTime}-{clip.endTime}s)
                  </div>

                  {/* Viral Score Badge */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4cd7f6] text-[#001f26] text-[10px] font-bold shadow-lg">
                    <TrendingUp size={10} />
                    <span>{clip.score} {t.viralScore}</span>
                  </div>
                </div>

                {/* Clip details */}
                <div className="px-1 pb-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-xs text-white truncate max-w-[140px]">{clip.title}</p>
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-[#cbc3d7] shrink-0 font-medium font-mono">
                      {clip.platform}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#cbc3d7]/70 line-clamp-2 leading-tight">
                    {clip.reason}
                  </p>
                </div>

                {/* Add to timeline floating action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddClipToTimeline(clip);
                  }}
                  className="absolute bottom-2 right-2.5 w-6 h-6 rounded-full bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md cursor-pointer"
                  title={t.addSegment}
                >
                  <Plus size={14} strokeWidth={3} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Manual Refresh / Regenerate button */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-[#131b2e]">
        <button 
          onClick={() => onRegenerateClips(videoDescription)}
          disabled={isGenerating}
          className="w-full py-2.5 rounded-lg border border-[#4cd7f6]/30 text-[#4cd7f6] font-bold hover:bg-[#4cd7f6]/10 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw size={14} className={isGenerating ? "animate-spin" : ""} />
          <span>{t.regenBtn}</span>
        </button>
      </div>
    </aside>
  );
}
