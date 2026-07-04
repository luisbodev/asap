"use client";

import { useState } from "react";
import { Calendar, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDemo } from "@/context/AppDemoContext";

export function SocialConnectModal() {
  const router = useRouter();
  const {
    lang,
    showSocialConnectModal,
    setShowSocialConnectModal,
    handleCompleteSocialLogin,
    skipSocialLogin,
  } = useAppDemo();

  const [tiktokLinked, setTiktokLinked] = useState(false);
  const [instagramLinked, setInstagramLinked] = useState(false);
  const [youtubeLinked, setYoutubeLinked] = useState(false);
  const [tiktokLoading, setTiktokLoading] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(false);

  if (!showSocialConnectModal) return null;

  const handleLink = (id: string) => {
    const link = (setLoading: (v: boolean) => void, setLinked: (v: boolean) => void) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setLinked(true);
      }, 1200);
    };
    if (id === "tiktok") link(setTiktokLoading, setTiktokLinked);
    if (id === "instagram") link(setInstagramLoading, setInstagramLinked);
    if (id === "youtube") link(setYoutubeLoading, setYoutubeLinked);
  };

  const platforms = [
    {
      id: "tiktok",
      name: "TikTok Creator Account",
      icon: <span className="font-extrabold text-xs font-mono">TT</span>,
      color: "bg-black text-white border-white/10 hover:bg-black/80",
      linked: tiktokLinked,
      loading: tiktokLoading,
    },
    {
      id: "instagram",
      name: "Instagram Professional",
      icon: <span className="text-[10px] font-bold">IG</span>,
      color: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      linked: instagramLinked,
      loading: instagramLoading,
    },
    {
      id: "youtube",
      name: "YouTube Shorts Channel",
      icon: <span className="text-[10px] font-bold">YT</span>,
      color: "bg-red-600 text-white",
      linked: youtubeLinked,
      loading: youtubeLoading,
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#171f33] border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 flex items-center justify-center mx-auto text-[#4cd7f6] mb-3">
            <Calendar size={24} />
          </div>
          <h3 className="text-xl font-black text-white">
            {lang === "es" ? "🔗 Conectar tus Redes Sociales" : "🔗 Connect Your Social Accounts"}
          </h3>
          <p className="text-xs text-[#cbc3d7]/70 leading-relaxed">
            {lang === "es"
              ? "Para sincronizar tu calendario de contenido y habilitar la publicación automática, por favor vincula tus cuentas oficiales."
              : "To synchronize your editorial calendar and enable automatic publishing, please link your official accounts."}
          </p>
        </div>

        <div className="space-y-3">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="p-3 rounded-xl bg-[#0b1326] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 text-left">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${platform.color}`}
                >
                  {platform.icon}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white">{platform.name}</p>
                  <p className="text-[10px] text-[#cbc3d7]/60 font-mono">
                    {platform.linked ? "✓ @AlexRivera" : lang === "es" ? "Desconectado" : "Disconnected"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={platform.loading}
                onClick={() => handleLink(platform.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  platform.linked
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#a078ff]/10 text-[#d0bcff] border border-[#a078ff]/20 hover:bg-[#a078ff]/20"
                }`}
              >
                {platform.loading ? (
                  <Loader2 size={12} className="animate-spin mx-auto text-[#d0bcff]" />
                ) : platform.linked ? (
                  lang === "es" ? "Conectado" : "Linked"
                ) : lang === "es" ? (
                  "Conectar"
                ) : (
                  "Connect"
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 space-y-3">
          <button
            type="button"
            onClick={() => {
              handleCompleteSocialLogin();
              router.push("/dashboard");
            }}
            className="w-full py-3 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-extrabold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-[#a078ff]/15 flex items-center justify-center gap-2"
          >
            <span>
              {lang === "es" ? "Sincronizar y Entrar al Dashboard" : "Sync & Enter Dashboard"}
            </span>
            <ArrowRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              skipSocialLogin();
              router.push("/dashboard");
            }}
            className="w-full py-2 bg-transparent hover:bg-white/5 text-[#cbc3d7]/60 hover:text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer"
          >
            {lang === "es" ? "Omitir por ahora (Conectar después)" : "Skip for now (Link later)"}
          </button>
        </div>
      </div>
    </div>
  );
}
