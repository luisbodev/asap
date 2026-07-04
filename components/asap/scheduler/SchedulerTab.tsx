"use client";

import React, { useState } from "react";
import { Calendar, Clock, Check, RefreshCw, Send, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

interface SchedulerTabProps {
  currentProject: ProjectInfo;
  lang?: "es" | "en";
}

export default function SchedulerTab({ currentProject, lang = "es" }: SchedulerTabProps) {
  const t = {
    es: {
      calendarTitle: "Calendario de Contenido - Julio 2026",
      daysOfWeek: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      scheduledForDay: "Clips Programados - Julio",
      scheduledCount: "Programados",
      selectDateSub: "Selecciona una fecha para ver o insertar videos en cola.",
      noVideos: "No hay videos programados para este día. ¡Completa la cola abajo!",
      deleteBtn: "Eliminar",
      scheduleCurrentTitle: "Programar Clip Actual",
      videoTitleLabel: "Título del Video",
      platformLabel: "Plataforma",
      timeLabel: "Hora (UTC)",
      captionLabel: "Subtítulo / Descripción",
      captionPlaceholder: "Agrega descripciones, tags virales, etc.",
      scheduleBtn: "Programar para el de Julio",
    },
    en: {
      calendarTitle: "July 2026 Content Calendar",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      scheduledForDay: "Scheduled Clips - July",
      scheduledCount: "Scheduled",
      selectDateSub: "Select a calendar date to view or insert social video cues.",
      noVideos: "No videos scheduled for this day yet. Fill the queue below!",
      deleteBtn: "Delete",
      scheduleCurrentTitle: "Schedule Current Clip",
      videoTitleLabel: "Video Target Title",
      platformLabel: "Platform",
      timeLabel: "Time (UTC)",
      captionLabel: "Caption Subtitles",
      captionPlaceholder: "Add captions, viral tags, or description here...",
      scheduleBtn: "Schedule on July",
    }
  }[lang];

  const [selectedDay, setSelectedDay] = useState<number>(4); // July 4th
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, day: 4, time: "18:30", title: "Summer Vlog - Perfect Transition Highlight", platform: "TikTok", caption: "You won't believe how beautiful this landscape transition looks! 🌲🌅 #vlog #cinematic", status: "Scheduled" },
    { id: 2, day: 5, time: "11:00", title: "Cinematic City Night", platform: "Instagram", caption: "Cruising down the neon streets at midnight. Captured in pristine 4K. 💫🌃 #reels #aesthetic", status: "Scheduled" },
    { id: 3, day: 7, time: "09:00", title: "Healthy Bowl Smoothie Tutorial", platform: "YouTube Shorts", caption: "The easiest post-travel snack smoothie bowl ever. Healthy lifestyle 🍓🍌 #cooking #shorts", status: "Draft" },
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostPlatform, setNewPostPlatform] = useState("TikTok");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostTime, setNewPostTime] = useState("12:00");

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle) return;
    const newPost = {
      id: Date.now(),
      day: selectedDay,
      time: newPostTime,
      title: newPostTitle,
      platform: newPostPlatform,
      caption: newPostCaption,
      status: "Scheduled"
    };
    setScheduledPosts([...scheduledPosts, newPost]);
    setNewPostTitle("");
    setNewPostCaption("");
  };

  const deletePost = (id: number) => {
    setScheduledPosts(scheduledPosts.filter(p => p.id !== id));
  };

  const getPostsForDay = (dayNum: number) => {
    return scheduledPosts.filter(p => p.day === dayNum);
  };

  // July 2026 dates (starts on Wednesday, July 1st)
  const daysInMonth = 31;
  const startOffset = 3; // Wednesday offset for beautiful grid rendering
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getPlatformStyle = (p: string) => {
    switch (p.toLowerCase()) {
      case "tiktok": return "bg-[#a078ff]/10 text-[#a078ff] border-[#a078ff]/20";
      case "instagram": return "bg-[#ffb2b7]/10 text-[#ffb2b7] border-[#ffb2b7]/20";
      case "youtube shorts":
      case "youtube": return "bg-[#4cd7f6]/10 text-[#4cd7f6] border-[#4cd7f6]/20";
      default: return "bg-white/5 text-[#cbc3d7] border-white/10";
    }
  };

  return (
    <div id="scheduler-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 select-none flex flex-col lg:flex-row gap-6">
      
      {/* Calendar Area */}
      <div className="flex-1 bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#d0bcff]" />
            <h2 className="text-sm font-bold text-white">{t.calendarTitle}</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded border border-white/5">
            <button type="button" className="p-0.5 text-[#cbc3d7] hover:text-white"><ChevronLeft size={14} /></button>
            <span className="text-[10px] uppercase tracking-wider text-[#cbc3d7] font-bold font-mono">
              {lang === "es" ? "Julio 2026" : "July 2026"}
            </span>
            <button type="button" className="p-0.5 text-[#cbc3d7] hover:text-white"><ChevronRight size={14} /></button>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#cbc3d7]/60 font-mono">
          {t.daysOfWeek.map((dayName) => (
            <span key={dayName}>{dayName}</span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells */}
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`offset-${i}`} className="aspect-square bg-transparent rounded-lg" />
          ))}

          {/* Actual days */}
          {days.map((day) => {
            const isSelected = selectedDay === day;
            const posts = getPostsForDay(day);
            const hasPosts = posts.length > 0;

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`aspect-square p-1.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer relative ${
                  isSelected 
                    ? "bg-[#131b2e]/60 border-[#d0bcff] shadow-[0_0_10px_rgba(208,188,255,0.15)]" 
                    : "bg-[#0b1326] border-white/5 hover:border-white/10"
                }`}
              >
                <span className={`text-[11px] font-bold font-mono ${isSelected ? "text-[#d0bcff]" : "text-[#cbc3d7]"}`}>
                  {day}
                </span>

                {/* Post markers */}
                {hasPosts && (
                  <div className="flex gap-1 justify-center flex-wrap max-h-3 overflow-hidden">
                    {posts.map((p, idx) => (
                      <span 
                        key={p.id} 
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.platform === "TikTok" ? "bg-[#a078ff]" : p.platform === "Instagram" ? "bg-[#ffb2b7]" : "bg-[#4cd7f6]"
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduler Sidebar Detail Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
        
        {/* Planned posts for selected day */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4 flex-1">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{t.scheduledForDay} {selectedDay}{lang === "es" ? "" : "th"}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[#cbc3d7] text-[10px] font-bold">
                {getPostsForDay(selectedDay).length} {t.scheduledCount}
              </span>
            </h3>
            <p className="text-xs text-[#cbc3d7]/80 mt-1">{t.selectDateSub}</p>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {getPostsForDay(selectedDay).length === 0 ? (
              <div className="py-8 text-center text-xs text-[#cbc3d7]/40">
                {t.noVideos}
              </div>
            ) : (
              getPostsForDay(selectedDay).map((post) => (
                <div key={post.id} className="p-3 rounded-xl bg-[#0b1326] border border-white/5 space-y-2 relative group">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getPlatformStyle(post.platform)}`}>
                      {post.platform}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#cbc3d7] font-mono">
                      <Clock size={10} />
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate pr-6">{post.title}</h4>
                  <p className="text-[10px] text-[#cbc3d7]/80 italic line-clamp-2">
                    &ldquo;{post.caption}&rdquo;
                  </p>
                  <button 
                    onClick={() => deletePost(post.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer font-bold"
                  >
                    {t.deleteBtn}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Schedule a new post planner form */}
        <form onSubmit={handleAddPost} className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-3.5">
          <h3 className="text-sm font-bold text-white">{t.scheduleCurrentTitle}</h3>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.videoTitleLabel}</label>
            <input 
              type="text" 
              required
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="e.g. Vacation Reels Part 2"
              className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.platformLabel}</label>
              <select 
                value={newPostPlatform} 
                onChange={(e) => setNewPostPlatform(e.target.value)}
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
              >
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram Reels</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.timeLabel}</label>
              <input 
                type="text" 
                value={newPostTime}
                onChange={(e) => setNewPostTime(e.target.value)}
                placeholder="18:30"
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none font-mono" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.captionLabel}</label>
            <textarea 
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              placeholder={t.captionPlaceholder}
              className="w-full h-16 bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none resize-none custom-scrollbar" 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#d0bcff] text-[#3c0091] font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#d0bcff]/15"
          >
            <Plus size={14} strokeWidth={3} />
            <span>{t.scheduleBtn} {selectedDay}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
