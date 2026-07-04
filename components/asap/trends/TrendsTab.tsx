"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, RefreshCw, Flame, HelpCircle, Award, Sparkles } from "lucide-react";
import { TrendItem } from "@/types/asap";

interface TrendsTabProps {
  onSuggestTrends: (category: string) => Promise<TrendItem[]>;
  lang?: "es" | "en";
}

export default function TrendsTab({ onSuggestTrends, lang = "es" }: TrendsTabProps) {
  const t = {
    es: {
      title: "Explorador de Tendencias de IA",
      subtitle: "Explora pistas de audio virales en vivo, transiciones de edición y estructuras de video calificadas por Gemini.",
      viralRank: "Rango Viral",
      difficultyLabel: "Edición",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      suggestedAudio: "Audio Sugerido:",
      categoryReach: "Alcance de Categoría:",
      proTipTitle: "Cómo ASAP AI extrae clips virales:",
      proTipDesc: "Nuestros modelos analizan el flujo de diálogo, el contraste visual y los disparadores de sonido para identificar momentos destacados con un alto coeficiente de capacidad de compartir en redes sociales. ¡Mantén las transcripciones detalladas para mejorar la precisión!",
      refreshBtn: "Forzar Actualización de Tendencias",
      fallbackTrends: [
        { trendName: "El Paneo Rápido de Atardecer", concept: "Comienza con un primer plano de un artículo de viaje, paneo rápido (whip pan) hacia una vista impresionante de un paisaje durante la hora dorada.", audioSuggestion: "Lo-Fi relajante y alegre", difficulty: "Easy", viewsCount: "4.2M vistas" },
        { trendName: "Zoom de Velocidad Suave", concept: "Sincroniza empujes rápidos de la cámara hacia adelante con ritmos de bajo de la música.", audioSuggestion: "Beats electrónicos de Synthwave", difficulty: "Medium", viewsCount: "8.1M vistas" },
        { trendName: "Comentarios con Títulos de Texto", concept: "Títulos con tipografía minimalista detallando guías de viaje con transiciones suaves de desvanecimiento.", audioSuggestion: "Guitarra acústica indie folk", difficulty: "Easy", viewsCount: "2.5M vistas" }
      ],
      categories: [
        "Travel & Lifestyle",
        "Tech & Gadgets",
        "Cooking & Food",
        "Fitness & Health",
        "Comedy & Skits",
        "ASMR & Aesthetics"
      ]
    },
    en: {
      title: "AI Social Trends Scout",
      subtitle: "Browse live viral sound tracks, editing transitions, and video structures graded by Gemini.",
      viralRank: "Viral Rank",
      difficultyLabel: "Edit",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      suggestedAudio: "Suggested Audio:",
      categoryReach: "Category Reach:",
      proTipTitle: "How ASAP AI extracts viral clips:",
      proTipDesc: "Our models analyze dialogue flow, visual contrast, and sound triggers to identify highlight moments with a high coefficient of social sharing capability. Keep transcripts detailed to improve accuracy!",
      refreshBtn: "Force Trend Refresh",
      fallbackTrends: [
        { trendName: "The Fast Sunset Pan", concept: "Start with a close up of a travel item, quick whip pan to a stunning golden hour landscape view.", audioSuggestion: "Chill jazzy up-beat Lo-Fi", difficulty: "Easy", viewsCount: "4.2M views" },
        { trendName: "Smooth Velocity Zoom", concept: "Match quick camera push forwards with rhythmic bass drops of the music.", audioSuggestion: "Synthwave electronic beats", difficulty: "Medium", viewsCount: "8.1M views" },
        { trendName: "Text overlay commentary", concept: "Minimalist font titles detailing travel checklist guides with smooth fade transitions.", audioSuggestion: "Acoustic indie folk guitar", difficulty: "Easy", viewsCount: "2.5M views" }
      ],
      categories: [
        "Travel & Lifestyle",
        "Tech & Gadgets",
        "Cooking & Food",
        "Fitness & Health",
        "Comedy & Skits",
        "ASMR & Aesthetics"
      ]
    }
  }[lang];

  const [category, setCategory] = useState("Travel & Lifestyle");
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = t.categories;

  const fetchTrends = async (cat: string) => {
    setIsGenerating(true);
    try {
      const data = await onSuggestTrends(cat);
      setTrends(data);
    } catch (err) {
      console.error(err);
      // Fallback static trends if Gemini fails
      setTrends(t.fallbackTrends as TrendItem[]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    fetchTrends(category);
  }, [category]);

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "hard": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-white/5 text-[#cbc3d7] border-white/10";
    }
  };

  const getDifficultyText = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": return t.easy;
      case "medium": return t.medium;
      case "hard": return t.hard;
      default: return diff;
    }
  };

  return (
    <div id="trends-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 select-none">
      
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-[#d0bcff]" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-[#cbc3d7]/80 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                category === cat
                  ? "bg-[#d0bcff]/10 text-[#d0bcff] border-[#d0bcff]"
                  : "bg-[#171f33] border-white/5 text-[#cbc3d7] hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Trends list */}
      {isGenerating ? (
        /* Loading animation */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#171f33] p-5 rounded-2xl border border-white/5 animate-pulse space-y-4">
              <div className="h-4 bg-white/10 rounded w-1/3" />
              <div className="h-6 bg-white/10 rounded w-3/4" />
              <div className="h-16 bg-white/10 rounded w-full" />
              <div className="h-8 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend, idx) => (
            <div 
              key={idx} 
              className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4 flex flex-col justify-between hover:border-[#4cd7f6]/40 transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border font-mono uppercase ${getDifficultyColor(trend.difficulty)}`}>
                    {getDifficultyText(trend.difficulty)} {t.difficultyLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#cbc3d7]/60 text-[10px]">
                    <Award size={12} className="text-[#4cd7f6]" />
                    <span>{t.viralRank} #{idx + 1}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Flame size={14} className="text-[#ff516a]" />
                    <span>{trend.trendName}</span>
                  </h3>
                  <p className="text-xs text-[#cbc3d7] leading-relaxed mt-2">
                    {trend.concept}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#cbc3d7]/60 uppercase tracking-wider font-mono">{t.suggestedAudio}</span>
                  <span className="text-[11px] text-[#4cd7f6] font-bold truncate max-w-[150px]">{trend.audioSuggestion}</span>
                </div>
                {trend.viewsCount && (
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#cbc3d7]/60 uppercase tracking-wider font-mono font-bold">{t.categoryReach}</span>
                    <span className="text-[11px] text-[#cbc3d7] font-bold">{trend.viewsCount}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pro Tips Section */}
      <div className="bg-gradient-to-r from-[#171f33] to-[#131b2e] p-6 rounded-2xl border border-[#d0bcff]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-[#d0bcff]/10 flex items-center justify-center shrink-0 text-[#d0bcff]">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{t.proTipTitle}</h4>
            <p className="text-xs text-[#cbc3d7] leading-relaxed mt-1 max-w-xl">
              {t.proTipDesc}
            </p>
          </div>
        </div>
        <button 
          onClick={() => fetchTrends(category)}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs text-white border border-white/10 transition-all font-bold cursor-pointer shrink-0"
        >
          {t.refreshBtn}
        </button>
      </div>

    </div>
  );
}
