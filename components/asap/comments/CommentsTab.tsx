"use client";

import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Send, RefreshCw, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { CommentItem } from "@/types/asap";

interface CommentsTabProps {
  comments: CommentItem[];
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  onGenerateAIReply: (commentText: string, author: string, tone: string) => Promise<string>;
  lang?: "es" | "en";
}

export default function CommentsTab({
  comments,
  setComments,
  onGenerateAIReply,
  lang = "es",
}: CommentsTabProps) {
  const t = {
    es: {
      title: "Gestor de Comentarios del Público",
      subtitle: "Selecciona cualquier comentario para redactar o auto-generar respuestas con Gemini AI.",
      replied: "Respondido",
      pendingDraft: "Borrador de IA Pendiente",
      alexReply: "Respuesta de Alex Rivera:",
      reviewing: "Revisando Comentario",
      says: "dice:",
      presetTone: "Seleccionar Tono de IA",
      customGuidelines: "O especifica pautas de respuesta personalizadas",
      overrideActive: "Anulación Activa",
      customPlaceholder: "ej. mencionar que se usó la cámara Sony A7SIII",
      draftBtn: "Redactar Respuesta con Gemini",
      responseDraft: "Borrador de Respuesta de IA",
      draftPlaceholder: "Tu respuesta redactada aparecerá aquí. Edita como desees...",
      publishBtn: "Aprobar y Publicar Respuesta",
      noComments: "No hay comentarios activos.",
      tones: ["Ingenioso y divertido", "Profesional y agradecido", "Compañero de viaje casual", "Corto y directo", "Alegre y enérgico"]
    },
    en: {
      title: "Audience Comments Manager",
      subtitle: "Select any comment to draft or auto-generate replies with Gemini AI.",
      replied: "Replied",
      pendingDraft: "Pending AI Draft",
      alexReply: "Alex Rivera Reply:",
      reviewing: "Reviewing Comment",
      says: "says:",
      presetTone: "Select AI Tone Preset",
      customGuidelines: "Or specify custom reply guidelines",
      overrideActive: "Active Override",
      customPlaceholder: "e.g. mention the camera used is Sony A7SIII",
      draftBtn: "Draft Smart Reply with Gemini",
      responseDraft: "AI Response Draft",
      draftPlaceholder: "Your drafted reply will appear here. Edit as needed...",
      publishBtn: "Approve & Publish Reply",
      noComments: "No active comments.",
      tones: ["Witty & engaging", "Professional & grateful", "Casual travel buddy", "Short & punchy", "Playful & energetic"]
    }
  }[lang];

  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(comments[0]?.id || null);
  const [aiTone, setAiTone] = useState(t.tones[0]);
  const [draftReply, setDraftReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [customReplyPrompt, setCustomReplyPrompt] = useState("");

  const activeComment = comments.find(c => c.id === selectedCommentId) || comments[0];

  const handleGenerateReply = async () => {
    if (!activeComment) return;
    setIsGenerating(true);
    try {
      const promptTone = customReplyPrompt ? `Custom: ${customReplyPrompt}` : aiTone;
      const text = await onGenerateAIReply(activeComment.commentText, activeComment.author, promptTone);
      setDraftReply(text);
    } catch (err) {
      console.error(err);
      setDraftReply("Error generating response. Please check your Gemini API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishReply = () => {
    if (!activeComment || !draftReply) return;
    setComments(prev => prev.map(c => {
      if (c.id === activeComment.id) {
        return {
          ...c,
          replied: true,
          replyText: draftReply,
        };
      }
      return c;
    }));
    setDraftReply("");
    setCustomReplyPrompt("");
  };

  const tones = t.tones;

  return (
    <div id="comments-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 select-none flex flex-col lg:flex-row gap-6">
      
      {/* Comments List Panel */}
      <div className="flex-1 bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4 flex flex-col h-[550px]">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-[#d0bcff]" />
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-[#cbc3d7]/80 mt-1">{t.subtitle}</p>
        </div>

        {/* Comments scrolling track */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
          {comments.map((comment) => {
            const isSelected = selectedCommentId === comment.id;
            return (
              <div
                key={comment.id}
                onClick={() => {
                  setSelectedCommentId(comment.id);
                  setDraftReply("");
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? "bg-[#131b2e]/60 border-[#d0bcff] shadow-[0_0_10px_rgba(208,188,255,0.1)]" 
                    : "bg-[#0b1326] border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 shrink-0 overflow-hidden">
                    <img 
                      src={comment.avatarUrl} 
                      className="w-full h-full object-cover" 
                      alt={comment.author}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white truncate">{comment.author}</span>
                      <span className="text-[10px] text-[#cbc3d7]/60 font-mono">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#cbc3d7] mt-1 line-clamp-2">&ldquo;{comment.commentText}&rdquo;</p>
                    
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-3 text-[10px] text-[#cbc3d7]/80">
                        <span className="flex items-center gap-1"><ThumbsUp size={10} /> {comment.likes}</span>
                        <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] font-mono">{comment.platform}</span>
                      </div>
                      
                      {comment.replied ? (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold font-mono">
                          <CheckCircle size={10} /> {t.replied}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#d0bcff] font-bold font-mono">{t.pendingDraft}</span>
                      )}
                    </div>

                    {comment.replied && comment.replyText && (
                      <div className="mt-3 p-2 bg-[#131b2e] rounded border border-green-500/10 text-[11px] text-[#cbc3d7] leading-relaxed">
                        <strong className="text-white block mb-0.5">{t.alexReply}</strong>
                        &ldquo;{comment.replyText}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reply Workspace Panel */}
      <div className="w-full lg:w-96 bg-[#171f33] p-5 rounded-2xl border border-white/5 flex flex-col justify-between h-[550px] shrink-0">
        
        {activeComment ? (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Highlight active comment details */}
              <div className="p-3 bg-[#0b1326] rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider font-mono">{t.reviewing}</span>
                <p className="text-xs font-bold text-white">{activeComment.author} {t.says}</p>
                <p className="text-xs text-[#cbc3d7] italic leading-relaxed">&ldquo;{activeComment.commentText}&rdquo;</p>
              </div>

              {/* Configure AI Tone Options */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.presetTone}</label>
                <div className="flex flex-wrap gap-1.5">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => {
                        setAiTone(tone);
                        setCustomReplyPrompt("");
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        aiTone === tone && !customReplyPrompt
                          ? "bg-[#d0bcff]/10 text-[#d0bcff] border-[#d0bcff]"
                          : "bg-[#0b1326] border-white/5 text-[#cbc3d7] hover:border-white/10"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt Override */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.customGuidelines}</label>
                  {customReplyPrompt && <span className="text-[9px] text-[#4cd7f6] font-bold">{t.overrideActive}</span>}
                </div>
                <input
                  type="text"
                  value={customReplyPrompt}
                  onChange={(e) => {
                    setCustomReplyPrompt(e.target.value);
                    setAiTone("");
                  }}
                  placeholder={t.customPlaceholder}
                  className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
                />
              </div>

              {/* Button to summon Gemini reply generation */}
              <button
                onClick={handleGenerateReply}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-lg hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#a078ff]/10"
              >
                {isGenerating ? (
                  <RefreshCw className="animate-spin" size={14} />
                ) : (
                  <Sparkles size={14} />
                )}
                <span>{t.draftBtn}</span>
              </button>
            </div>

            {/* Generated Draft Workspace & Publish controls */}
            <div className="space-y-3 pt-4 border-t border-white/5 mt-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.responseDraft}</label>
                <textarea
                  value={draftReply}
                  onChange={(e) => setDraftReply(e.target.value)}
                  className="w-full h-24 bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none resize-none custom-scrollbar"
                  placeholder={t.draftPlaceholder}
                />
              </div>

              <button
                onClick={handlePublishReply}
                disabled={!draftReply || isGenerating}
                className="w-full py-2.5 bg-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-lg hover:scale-[1.02] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#4cd7f6]/10"
              >
                <Send size={14} />
                <span>{t.publishBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <AlertCircle className="text-[#cbc3d7]/30 mb-2" size={32} />
            <p className="text-xs text-[#cbc3d7]">{t.noComments}</p>
          </div>
        )}

      </div>
    </div>
  );
}
