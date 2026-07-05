"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Check, X, Send, Plus, ChevronLeft, ChevronRight, AlertCircle, Pencil } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

type PostStatus = "Scheduled" | "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Published";

interface ScheduledPost {
  id: number;
  day: number;
  time: string;
  title: string;
  platform: string;
  caption: string;
  status: PostStatus;
  feedback?: string;
  imageUrl?: string;
}

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
      pendingApproval: "Pendiente de aprobación",
      approved: "Aprobado",
      rejected: "Rechazado",
      published: "Publicado",
      approveBtn: "Aprobar",
      rejectBtn: "Rechazar",
      confirmRejectBtn: "Confirmar rechazo",
      cancelBtn: "Cancelar",
      commentLabel: "Comentario (obligatorio)",
      commentPlaceholder: "Describe qué debe cambiar antes de publicar...",
      commentRequired: "Debes dejar un comentario para rechazar el post.",
      feedbackLabel: "Comentario del revisor",
      publishModalTitle: "Post aprobado",
      publishModalDesc: "¿Quieres subirlo ahora o mantenerlo programado para más tarde?",
      uploadNowBtn: "Subir ahora",
      keepScheduledBtn: "Mantener programado",
      uploadingToast: "Subiendo a",
      uploadSuccessToast: "Publicado en",
      uploadErrorToast: "Error al publicar. Intenta de nuevo.",
      uploadingBtn: "Publicando...",
      keptScheduledToast: "Mantenido programado para el",
      imagePreviewLabel: "Imagen a publicar",
      editCaptionBtn: "Editar caption",
      saveCaptionBtn: "Guardar caption",
      postCaptionLabel: "Caption",
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
      pendingApproval: "Pending approval",
      approved: "Approved",
      rejected: "Rejected",
      published: "Published",
      approveBtn: "Approve",
      rejectBtn: "Reject",
      confirmRejectBtn: "Confirm rejection",
      cancelBtn: "Cancel",
      commentLabel: "Comment (required)",
      commentPlaceholder: "Describe what needs to change before publishing...",
      commentRequired: "You must leave a comment to reject the post.",
      feedbackLabel: "Reviewer comment",
      publishModalTitle: "Post approved",
      publishModalDesc: "Would you like to upload it now or keep it scheduled for later?",
      uploadNowBtn: "Upload now",
      keepScheduledBtn: "Keep scheduled",
      uploadingToast: "Uploading to",
      uploadSuccessToast: "Published on",
      uploadErrorToast: "Failed to publish. Please try again.",
      uploadingBtn: "Publishing...",
      keptScheduledToast: "Kept scheduled for July",
      imagePreviewLabel: "Image to publish",
      editCaptionBtn: "Edit caption",
      saveCaptionBtn: "Save caption",
      postCaptionLabel: "Caption",
    }
  }[lang];

  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    { id: 1, day: 4, time: "18:30", title: "Summer Vlog - Perfect Transition Highlight", platform: "TikTok", caption: "You won't believe how beautiful this landscape transition looks! 🌲🌅 #vlog #cinematic", status: "Scheduled" },
    { id: 2, day: 5, time: "11:00", title: "ASAP", platform: "Instagram", caption: "Todo tu equipo creativo en un solo lugar. Gestiona, crea y publica sin salir de ASAP. ✨ #ASAP #creativos #socialmedia #marketingdigital", status: "Pending Approval", imageUrl: "/posts/equipo-creativo-asap.png" },
    { id: 3, day: 7, time: "09:00", title: "Healthy Bowl Smoothie Tutorial", platform: "YouTube Shorts", caption: "The easiest post-travel snack smoothie bowl ever. Healthy lifestyle 🍓🍌 #cooking #shorts", status: "Draft" },
  ]);

  const [rejectingPostId, setRejectingPostId] = useState<number | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [rejectError, setRejectError] = useState<string | null>(null);
  const [publishModalPost, setPublishModalPost] = useState<ScheduledPost | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingCaptionPostId, setEditingCaptionPostId] = useState<number | null>(null);
  const [editingCaptionValue, setEditingCaptionValue] = useState("");

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostPlatform, setNewPostPlatform] = useState("TikTok");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostTime, setNewPostTime] = useState("12:00");

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle) return;
    const newPost: ScheduledPost = {
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

  const updatePost = (id: number, updates: Partial<ScheduledPost>) => {
    setScheduledPosts(scheduledPosts.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleApprove = (post: ScheduledPost) => {
    updatePost(post.id, { status: "Approved" });
    setRejectingPostId(null);
    setRejectComment("");
    setRejectError(null);
    setPublishModalPost({ ...post, status: "Approved" });
  };

  const handleRejectClick = (postId: number) => {
    setEditingCaptionPostId(null);
    setEditingCaptionValue("");
    setRejectingPostId(postId);
    setRejectComment("");
    setRejectError(null);
  };

  const handleStartEditCaption = (post: ScheduledPost) => {
    setRejectingPostId(null);
    setRejectComment("");
    setRejectError(null);
    setEditingCaptionPostId(post.id);
    setEditingCaptionValue(post.caption);
  };

  const handleSaveCaption = (postId: number) => {
    if (!editingCaptionValue.trim()) return;
    updatePost(postId, { caption: editingCaptionValue.trim() });
    setEditingCaptionPostId(null);
    setEditingCaptionValue("");
  };

  const handleCancelEditCaption = () => {
    setEditingCaptionPostId(null);
    setEditingCaptionValue("");
  };

  const handleConfirmReject = (postId: number) => {
    if (!rejectComment.trim()) {
      setRejectError(t.commentRequired);
      return;
    }
    updatePost(postId, { status: "Rejected", feedback: rejectComment.trim() });
    setRejectingPostId(null);
    setRejectComment("");
    setRejectError(null);
  };

  const resolveImageUrl = (url: string) =>
    url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const handleUploadNow = async () => {
    if (!publishModalPost || isUploading) return;

    setIsUploading(true);

    try {
      const imageUrl = resolveImageUrl(
        publishModalPost.imageUrl ?? "/posts/equipo-creativo-asap.png"
      );

      const response = await fetch("/api/n8n/instagram-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          caption: publishModalPost.caption,
        }),
      });

      if (!response.ok) {
        throw new Error("Webhook failed");
      }

      updatePost(publishModalPost.id, { status: "Published" });
      setActionToast(`${t.uploadSuccessToast} ${publishModalPost.platform}`);
      setPublishModalPost(null);
      setTimeout(() => setActionToast(null), 3500);
    } catch {
      setActionToast(t.uploadErrorToast);
      setTimeout(() => setActionToast(null), 3500);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeepScheduled = () => {
    if (!publishModalPost) return;
    updatePost(publishModalPost.id, { status: "Scheduled" });
    setActionToast(`${t.keptScheduledToast} ${publishModalPost.day} ${lang === "es" ? "a las" : "at"} ${publishModalPost.time}`);
    setPublishModalPost(null);
    setTimeout(() => setActionToast(null), 3500);
  };

  const getPostsForDay = (dayNum: number) => {
    return scheduledPosts.filter(p => p.day === dayNum);
  };

  const getStatusStyle = (status: PostStatus) => {
    switch (status) {
      case "Pending Approval": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Published": return "bg-[#4cd7f6]/10 text-[#4cd7f6] border-[#4cd7f6]/20";
      default: return "bg-white/5 text-[#cbc3d7]/60 border-white/10";
    }
  };

  const getStatusLabel = (status: PostStatus) => {
    switch (status) {
      case "Pending Approval": return t.pendingApproval;
      case "Approved": return t.approved;
      case "Rejected": return t.rejected;
      case "Published": return t.published;
      default: return status;
    }
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
                    {posts.map((p) => (
                      <span 
                        key={p.id} 
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.status === "Pending Approval"
                            ? "bg-amber-400 animate-pulse"
                            : p.platform === "TikTok"
                              ? "bg-[#a078ff]"
                              : p.platform === "Instagram"
                                ? "bg-[#ffb2b7]"
                                : "bg-[#4cd7f6]"
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

          <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
            {getPostsForDay(selectedDay).length === 0 ? (
              <div className="py-8 text-center text-xs text-[#cbc3d7]/40">
                {t.noVideos}
              </div>
            ) : (
              getPostsForDay(selectedDay).map((post) => {
                const isPending = post.status === "Pending Approval";
                const isRejecting = rejectingPostId === post.id;
                const isEditingCaption = editingCaptionPostId === post.id;
                const canEditCaption = post.status !== "Published";

                return (
                  <div
                    key={post.id}
                    className={`p-3 rounded-xl bg-[#0b1326] border space-y-2 relative group ${
                      isPending ? "border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.08)]" : "border-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getPlatformStyle(post.platform)}`}>
                        {post.platform}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {post.status !== "Scheduled" && post.status !== "Draft" && (
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border ${getStatusStyle(post.status)}`}>
                            {getStatusLabel(post.status)}
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-[10px] text-[#cbc3d7] font-mono">
                          <Clock size={10} />
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {post.imageUrl && (
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-[#cbc3d7]/60 uppercase tracking-wider font-mono">
                          {t.imagePreviewLabel}
                        </p>
                        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-[#171f33]">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      </div>
                    )}

                    <h4 className="text-xs font-bold text-white truncate pr-6">{post.title}</h4>

                    {isEditingCaption ? (
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
                          {t.postCaptionLabel}
                        </label>
                        <textarea
                          value={editingCaptionValue}
                          onChange={(e) => setEditingCaptionValue(e.target.value)}
                          rows={4}
                          className="w-full bg-[#171f33] text-[10px] text-white rounded-lg p-2 border border-white/10 focus:border-[#d0bcff]/50 outline-none resize-none custom-scrollbar"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveCaption(post.id)}
                            disabled={!editingCaptionValue.trim()}
                            className="flex-1 py-1.5 rounded-lg bg-[#d0bcff]/15 border border-[#d0bcff]/25 text-[#d0bcff] text-[10px] font-bold hover:bg-[#d0bcff]/25 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {t.saveCaptionBtn}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEditCaption}
                            className="flex-1 py-1.5 rounded-lg border border-white/10 text-[#cbc3d7] text-[10px] font-bold hover:bg-white/5 transition-all cursor-pointer"
                          >
                            {t.cancelBtn}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-[10px] text-[#cbc3d7]/80 italic line-clamp-3">
                          &ldquo;{post.caption}&rdquo;
                        </p>
                        {canEditCaption && (
                          <button
                            type="button"
                            onClick={() => handleStartEditCaption(post)}
                            className="flex items-center gap-1 text-[10px] text-[#d0bcff]/80 hover:text-[#d0bcff] font-bold transition-colors cursor-pointer"
                          >
                            <Pencil size={10} />
                            {t.editCaptionBtn}
                          </button>
                        )}
                      </div>
                    )}

                    {post.feedback && (
                      <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/15 space-y-0.5">
                        <p className="text-[9px] font-bold text-red-400 uppercase tracking-wider">{t.feedbackLabel}</p>
                        <p className="text-[10px] text-[#cbc3d7]/90">{post.feedback}</p>
                      </div>
                    )}

                    {isPending && !isRejecting && !isEditingCaption && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleApprove(post)}
                          className="flex-1 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check size={11} strokeWidth={3} />
                          {t.approveBtn}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectClick(post.id)}
                          className="flex-1 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold hover:bg-red-500/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X size={11} strokeWidth={3} />
                          {t.rejectBtn}
                        </button>
                      </div>
                    )}

                    {isRejecting && (
                      <div className="space-y-2 pt-1">
                        <label className="text-[9px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
                          {t.commentLabel}
                        </label>
                        <textarea
                          value={rejectComment}
                          onChange={(e) => {
                            setRejectComment(e.target.value);
                            setRejectError(null);
                          }}
                          placeholder={t.commentPlaceholder}
                          rows={3}
                          className="w-full bg-[#171f33] text-[10px] text-white rounded-lg p-2 border border-white/10 focus:border-red-400/50 outline-none resize-none custom-scrollbar"
                        />
                        {rejectError && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1">
                            <AlertCircle size={10} />
                            {rejectError}
                          </p>
                        )}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleConfirmReject(post.id)}
                            className="flex-1 py-1.5 rounded-lg bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-all cursor-pointer"
                          >
                            {t.confirmRejectBtn}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setRejectingPostId(null);
                              setRejectComment("");
                              setRejectError(null);
                            }}
                            className="flex-1 py-1.5 rounded-lg border border-white/10 text-[#cbc3d7] text-[10px] font-bold hover:bg-white/5 transition-all cursor-pointer"
                          >
                            {t.cancelBtn}
                          </button>
                        </div>
                      </div>
                    )}

                    {!isPending && !isRejecting && (
                      <button
                        type="button"
                        onClick={() => deletePost(post.id)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer font-bold"
                      >
                        {t.deleteBtn}
                      </button>
                    )}
                  </div>
                );
              })
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

      {/* Publish decision modal */}
      {publishModalPost && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#171f33] border border-[#4cd7f6]/20 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 flex items-center justify-center shrink-0">
                <Send className="text-[#4cd7f6]" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white">{t.publishModalTitle}</p>
                <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">{t.publishModalDesc}</p>
                <p className="text-[10px] text-[#cbc3d7]/60 mt-2 font-mono">
                  {publishModalPost.title} · {lang === "es" ? "Julio" : "July"} {publishModalPost.day} · {publishModalPost.time}
                </p>
              </div>
            </div>

            {publishModalPost.imageUrl && (
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-[#0b1326]">
                <Image
                  src={publishModalPost.imageUrl}
                  alt={publishModalPost.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUploadNow}
                disabled={isUploading}
                className="flex-1 px-3.5 py-2 rounded-lg bg-[#4cd7f6] text-[#001f26] text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md shadow-[#4cd7f6]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isUploading ? t.uploadingBtn : t.uploadNowBtn}
              </button>
              <button
                type="button"
                onClick={handleKeepScheduled}
                className="flex-1 px-3.5 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-[#cbc3d7] font-bold cursor-pointer"
              >
                {t.keepScheduledBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action confirmation toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 bg-[#171f33]/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl z-50 border border-[#4cd7f6]/20 flex items-center gap-2 max-w-xs">
          <Check className="text-emerald-400 shrink-0" size={16} />
          <p className="text-xs text-white font-medium">{actionToast}</p>
        </div>
      )}

    </div>
  );
}
