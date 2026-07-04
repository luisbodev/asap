"use client";

import React from "react";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area 
} from "recharts";
import { BarChart3, TrendingUp, Users, Target, Zap } from "lucide-react";

interface AnalyticsTabProps {
  lang?: "es" | "en";
}

export default function AnalyticsTab({ lang = "es" }: AnalyticsTabProps) {
  const t = {
    es: {
      title: "Análisis de Rendimiento",
      subtitle: "Supervisa el número de vistas, las tasas de retención de audiencia promedio y la eficacia de los clips de redes sociales de IA.",
      totalViews: "Vistas Totales de esta Semana",
      totalViewsChange: "+42% desde la semana pasada",
      aiVirality: "Precisión de Viralidad de IA",
      aiViralityChange: "+2.1% ajuste de modelo",
      retentionRate: "Tasa de Retención de Audiencia",
      retentionRateChange: "+15% usando Clips de IA",
      dailyAudience: "Tráfico Diario de Audiencia (Vistas)",
      dailyAudienceSub: "Desglose interactivo del rendimiento de plataformas.",
      retentionCurve: "Curva de Retención de Espectadores (%)",
      retentionCurveSub: "Comparación entre corte manual estándar vs recomendación de ganchos de IA.",
      factorScores: "Puntajes de Viralidad por Factor de Edición",
      factorScoresSub: "Vista detallada de los parámetros que impulsan la retención de espectadores.",
      highlyOptimal: "Altamente Óptimo",
      aiHook: "Gancho Recortado por IA",
      stdCut: "Corte Estándar",
      days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      engagementDistribution: [
        { name: "Cortes y Transiciones", value: 85 },
        { name: "Sincronización de Audio", value: 92 },
        { name: "Subtítulos de Texto", value: 78 },
        { name: "Gradación de Color", value: 88 },
      ]
    },
    en: {
      title: "Performance Analytics",
      subtitle: "Monitor view counts, average audience retention rates, and the efficacy of AI-clipped social assets.",
      totalViews: "Total Views This Week",
      totalViewsChange: "+42% from last week",
      aiVirality: "AI Virality Accuracy",
      aiViralityChange: "+2.1% model tuning",
      retentionRate: "Audience Retention Rate",
      retentionRateChange: "+15% using AI Slices",
      dailyAudience: "Daily Audience Traffic (Views)",
      dailyAudienceSub: "Interactive platform performance breakdown.",
      retentionCurve: "Video Viewer Retention Curve (%)",
      retentionCurveSub: "Comparing standard manual crop vs AI hooks recommendation.",
      factorScores: "Editing Factor Virality Scores",
      factorScoresSub: "Detailed view of what parameters drives viewer watch retention.",
      highlyOptimal: "Highly Optimal",
      aiHook: "AI-Clipped Hook",
      stdCut: "Standard Cut",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      engagementDistribution: [
        { name: "Slices & Cuts", value: 85 },
        { name: "Audio Matching", value: 92 },
        { name: "Text Subtitles", value: 78 },
        { name: "Color Grading", value: 88 },
      ]
    }
  }[lang];

  // Real data schemas to feed recharts
  const dailyViewsData = [
    { day: t.days[0], TikTok: 12000, Reels: 8000, YouTube: 15000 },
    { day: t.days[1], TikTok: 19000, Reels: 11000, YouTube: 17000 },
    { day: t.days[2], TikTok: 32000, Reels: 24000, YouTube: 29000 },
    { day: t.days[3], TikTok: 41000, Reels: 35000, YouTube: 45000 },
    { day: t.days[4], TikTok: 54000, Reels: 48000, YouTube: 59000 },
    { day: t.days[5], TikTok: 78000, Reels: 62000, YouTube: 84000 },
    { day: t.days[6], TikTok: 95000, Reels: 78000, YouTube: 112000 },
  ];

  const viralRetentionData = [
    { time: "00:00", hook: 100, standard: 100 },
    { time: "00:05", hook: 94, standard: 82 },
    { time: "00:10", hook: 88, standard: 68 },
    { time: "00:15", hook: 85, standard: 59 },
    { time: "00:20", hook: 82, standard: 51 },
    { time: "00:25", hook: 79, standard: 44 },
    { time: "00:30", hook: 77, standard: 39 },
  ];

  const stats = [
    { label: t.totalViews, value: "285,000", change: t.totalViewsChange, icon: Users, color: "text-[#d0bcff]" },
    { label: t.aiVirality, value: "94.2%", change: t.aiViralityChange, icon: Target, color: "text-[#4cd7f6]" },
    { label: t.retentionRate, value: "81%", change: t.retentionRateChange, icon: Zap, color: "text-[#ffb2b7]" },
  ];

  return (
    <div id="analytics-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 select-none">
      
      {/* Tab Header */}
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 size={18} className="text-[#d0bcff]" />
          <span>{t.title}</span>
        </h2>
        <p className="text-xs text-[#cbc3d7]/80 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Numerical Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#171f33] p-5 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#cbc3d7]/60 font-bold font-mono">{stat.label}</span>
                <p className="text-xl font-extrabold text-white">{stat.value}</p>
                <p className="text-xs text-green-400 font-medium">{stat.change}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Graphs Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cumulative Views by social platforms */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">{t.dailyAudience}</h3>
            <p className="text-xs text-[#cbc3d7]/80 mt-1">{t.dailyAudienceSub}</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#cbc3d7" fontSize={11} tickLine={false} />
                <YAxis stroke="#cbc3d7" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#131b2e", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  labelStyle={{ color: "white", fontWeight: "bold" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Bar dataKey="TikTok" fill="#a078ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Reels" fill="#ffb2b7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="YouTube" fill="#4cd7f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Video Retention graph */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">{t.retentionCurve}</h3>
            <p className="text-xs text-[#cbc3d7]/80 mt-1">{t.retentionCurveSub}</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viralRetentionData}>
                <defs>
                  <linearGradient id="hookGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4cd7f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4cd7f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="stdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cbc3d7" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#cbc3d7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#cbc3d7" fontSize={11} tickLine={false} />
                <YAxis stroke="#cbc3d7" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#131b2e", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Area type="monotone" dataKey="hook" name={t.aiHook} stroke="#4cd7f6" fillOpacity={1} fill="url(#hookGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="standard" name={t.stdCut} stroke="#cbc3d7" fillOpacity={1} fill="url(#stdGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Breakdown Details */}
      <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">{t.factorScores}</h3>
          <p className="text-xs text-[#cbc3d7]/80 mt-1">{t.factorScoresSub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.engagementDistribution.map((item, idx) => (
            <div key={idx} className="bg-[#0b1326] p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-xs text-[#cbc3d7] block truncate">{item.name}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-white">{item.value}%</span>
                <span className="text-[10px] text-green-400 font-mono">{t.highlyOptimal}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#4cd7f6] rounded-full" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
