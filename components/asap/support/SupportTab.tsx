"use client";

import React, { useState, useRef, useEffect } from "react";
import { HelpCircle, Send, RefreshCw, MessageSquare, Shield, Globe, ExternalLink } from "lucide-react";
import { ChatMessage } from "@/types/asap";

interface SupportTabProps {
  chatMessages: ChatMessage[];
  onSendChatMessage: (text: string) => Promise<void>;
  isSendingChat: boolean;
  onClearHistory: () => void;
  lang?: "es" | "en";
}

export default function SupportTab({
  chatMessages,
  onSendChatMessage,
  isSendingChat,
  onClearHistory,
  lang = "es",
}: SupportTabProps) {
  const t = {
    es: {
      title: "Soporte y Base de Conocimientos",
      subtitle: "Explora guías de usuario, manuales de documentación o consulta a nuestro asistente de chat de IA Gemini en vivo.",
      faqHeader: "Preguntas Frecuentes",
      q1: "¿Cómo se califica la puntuación de viralidad?",
      a1: "Nuestro sistema califica los clips según la sincronicidad del ritmo de audio, las señales visuales narrativas y las métricas de eficiencia de gancho típicas de los primeros 5 segundos.",
      q2: "¿Qué plataformas están optimizadas?",
      a2: "Actualmente compilamos valores predeterminados de renderizado personalizados para las reglas de video de TikTok, las restricciones de aspecto de Instagram Reels y YouTube Shorts.",
      diagnostics: "DIAGNÓSTICOS DEL ESPACIO DE TRABAJO",
      serverConn: "Estado de la Conexión del Servidor:",
      online: "En línea",
      workspacePort: "Puerto del Espacio de Trabajo:",
      aiAssistant: "Asistente de IA Experto de ASAP",
      groundingEnabled: "Búsqueda en Google Habilitada",
      clearHistory: "Limpiar Historial",
      chatPlaceholder: "¡Hola! Soy tu asistente de soporte de IA. Pregúntame sobre edición de video, ritmo en redes sociales o cómo usar ASAP AI.",
      chatInputPlaceholder: "Pregunta a la IA sobre edición de video, tácticas de redes sociales...",
      brainstorming: "Gemini está buscando fuentes de información...",
      quickQuestions: [
        "¿Qué hace que un segmento de video sea viral?",
        "¿Cómo uso las pistas del editor?",
        "¿Cómo mejoro la tasa de retención de Reels?",
        "¿ASAP AI admite subtítulos automáticos?"
      ]
    },
    en: {
      title: "ASAP Support & Knowledge Base",
      subtitle: "Explore user guides, documentation manuals, or query our live Gemini AI chat helper.",
      faqHeader: "Frequently Asked Questions",
      q1: "How is the virality rating scored?",
      a1: "Our system grades clips based on audio rhythm synchronicity, narrative visual cues, and typical first-5-second hook efficiency metrics.",
      q2: "What platforms are optimized?",
      a2: "We currently compile render defaults customized for TikTok video rules, Instagram Reels aspect constraints, and YouTube Shorts.",
      diagnostics: "WORKSPACE DIAGNOSTICS",
      serverConn: "Server Connection Status:",
      online: "Online",
      workspacePort: "Workspace Port:",
      aiAssistant: "ASAP Expert AI Assistant",
      groundingEnabled: "Google Search Grounding Enabled",
      clearHistory: "Clear History",
      chatPlaceholder: "Hello! I am your AI Support Assistant. Ask me anything about video editing, social media pacing, or how to use ASAP AI's features.",
      chatInputPlaceholder: "Ask AI about video editing, social media tactics...",
      brainstorming: "Gemini is brainstorming grounding sources...",
      quickQuestions: [
        "What makes a video segment viral?",
        "How do I use the editor tracks?",
        "How can I improve my Reels retention rate?",
        "Does ASAP AI support auto subtitles?"
      ]
    }
  }[lang];

  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat list on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isSendingChat]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;
    onSendChatMessage(chatInput.trim());
    setChatInput("");
  };

  const quickQuestions = t.quickQuestions;

  return (
    <div id="support-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 select-none flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto h-[calc(100vh-100px)]">
      
      {/* FAQ & Quick Links Left side */}
      <div className="flex-1 bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-5 flex flex-col justify-between max-h-[580px]">
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle size={18} className="text-[#d0bcff]" />
              <span>{t.title}</span>
            </h2>
            <p className="text-xs text-[#cbc3d7]/80 mt-1">
              {t.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.faqHeader}</h3>
            
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#0b1326] border border-white/5 text-xs">
                <h4 className="font-bold text-white mb-1">{t.q1}</h4>
                <p className="text-[#cbc3d7]/80 leading-relaxed">
                  {t.a1}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0b1326] border border-white/5 text-xs">
                <h4 className="font-bold text-white mb-1">{t.q2}</h4>
                <p className="text-[#cbc3d7]/80 leading-relaxed">
                  {t.a2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* General SaaS metadata */}
        <div className="p-4 bg-[#131b2e] rounded-xl border border-white/5 space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#4cd7f6] uppercase tracking-wider">{t.diagnostics}</span>
          <div className="flex justify-between text-xs text-[#cbc3d7]/80">
            <span>{t.serverConn}</span>
            <span className="text-green-400 font-bold">{t.online}</span>
          </div>
          <div className="flex justify-between text-xs text-[#cbc3d7]/80">
            <span>{t.workspacePort}</span>
            <span className="font-mono text-[11px]">3000 (Active Proxy)</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Chat Panel */}
      <div className="flex-1 bg-[#171f33] p-5 rounded-2xl border border-white/5 flex flex-col h-[580px] shrink-0 justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-[#4cd7f6]" />
            <div>
              <span className="font-bold text-sm text-white block">{t.aiAssistant}</span>
              <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                <Globe size={10} /> {t.groundingEnabled}
              </span>
            </div>
          </div>
          <button 
            onClick={onClearHistory}
            className="text-[10px] text-[#cbc3d7] hover:text-white hover:underline font-bold"
          >
            {t.clearHistory}
          </button>
        </div>

        {/* Chat Scrolling Frame */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto custom-scrollbar my-4 pr-1 space-y-3.5"
        >
          {chatMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <MessageSquare size={32} className="text-[#cbc3d7]/30 mb-2" />
              <p className="text-xs text-[#cbc3d7] max-w-xs leading-relaxed">
                {t.chatPlaceholder}
              </p>

              {/* Quick Prompt recommendations */}
              <div className="mt-4 flex flex-col gap-1.5 w-full">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setChatInput(q);
                    }}
                    className="p-2 bg-[#0b1326] hover:bg-white/5 border border-white/5 rounded-lg text-xs text-[#cbc3d7] text-left hover:text-white transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
              >
                <div 
                  className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-[#d0bcff] text-[#3c0091] font-medium rounded-tr-none" 
                      : "bg-[#0b1326] text-[#dae2fd] border border-white/5 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Grounding sources citation footer */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1.5 justify-start">
                    {msg.sources.map((source, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#4cd7f6]/15 hover:bg-[#4cd7f6]/25 border border-[#4cd7f6]/20 text-[9px] text-[#4cd7f6] font-medium font-mono"
                      >
                        <span>{source.title}</span>
                        <ExternalLink size={8} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}

          {isSendingChat && (
            <div className="flex items-center gap-2 max-w-[85%] mr-auto">
              <div className="bg-[#0b1326] p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                <RefreshCw className="animate-spin text-[#4cd7f6]" size={14} />
                <span className="text-[11px] text-[#cbc3d7]">{t.brainstorming}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="flex gap-2 shrink-0 border-t border-white/5 pt-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t.chatInputPlaceholder}
            className="flex-1 bg-[#0b1326] text-xs text-white rounded-xl p-3 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isSendingChat}
            className="px-4 bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] font-bold text-xs rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </form>

      </div>

    </div>
  );
}
