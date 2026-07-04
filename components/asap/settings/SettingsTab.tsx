"use client";

import React from "react";
import { Settings, User, Sliders, Shield, Key, Sparkles, Check } from "lucide-react";
import { ProjectInfo } from "@/types/asap";

interface SettingsTabProps {
  currentProject: ProjectInfo;
  onUpdateProjectDefaults: (params: Partial<ProjectInfo>) => void;
  lang?: "es" | "en";
}

export default function SettingsTab({ currentProject, onUpdateProjectDefaults, lang = "es" }: SettingsTabProps) {
  const t = {
    es: {
      title: "Preferencias del Espacio de Trabajo",
      subtitle: "Personaliza perfiles de renderizado, restricciones de relación de aspecto, ajustes preestablecidos de subtítulos y parámetros de API del espacio de trabajo.",
      creatorProfile: "Perfil de Creador",
      channelName: "Nombre del Canal / Creador",
      nicheCategory: "Nicho / Categoría de Video",
      renderConfig: "Configuración de Renderizado de Proyecto Activo",
      renderRatio: "Relación de Aspecto del Renderizado",
      qualityStd: "Estándar de Calidad",
      frameRate: "Tasa de Fotogramas (FPS)",
      activeEditingStyle: "Tema de Estilo de Edición Activo",
      apiKeyMgmt: "Gestión de Claves Secretas de API",
      apiKeyDesc: "ASAP AI depende de la velocidad del LLM Gemini de Google. No necesitas ingresar claves manualmente; el espacio de trabajo administra de manera segura el acceso a través de endpoints en la nube protegidos.",
      securedPro: "ASEGURADO (PRO)",
      activeServiceKey: "Clave de Servicio Activa",
      saveSuccessMsg: "¡Preferencias actualizadas con éxito!",
      saveBtn: "Guardar Configuración",
      landscapeOption: "Horizontal (16:9) - YT",
      portraitOption: "Vertical (9:16) - TikTok/Reels",
      squareOption: "Cuadrado (1:1) - Post",
      fpsCinematic: "60 FPS Cinematográfico Alto",
      fpsStandard: "30 FPS Redes Sociales Estándar",
      nicheOptions: {
        travel: "Viajes y Estilo de vida",
        tech: "Tecnología y Programación",
        food: "Cocina y Comida",
        comedy: "Comedia y Sketches"
      }
    },
    en: {
      title: "Workspace Preferences",
      subtitle: "Customize render profiles, aspect ratio constraints, subtitle presets, and workspace API parameters.",
      creatorProfile: "Creator Profile",
      channelName: "Channel / Creator Name",
      nicheCategory: "Niche / Video Category",
      renderConfig: "Active Project Render Config",
      renderRatio: "Render Aspect Ratio",
      qualityStd: "Quality Standard",
      frameRate: "Frame Rate (FPS)",
      activeEditingStyle: "Active Editing Style Theme",
      apiKeyMgmt: "API Secret Key Management",
      apiKeyDesc: "ASAP AI relies on Google's high-speed Gemini LLM. You do not need to enter key details manually; the workspace automatically manages access via secured cloud endpoints securely.",
      securedPro: "SECURED (PRO)",
      activeServiceKey: "Active Service Key",
      saveSuccessMsg: "Preferences updated successfully!",
      saveBtn: "Save Configuration",
      landscapeOption: "Landscape (16:9) - YT",
      portraitOption: "Portrait (9:16) - TikTok/Reels",
      squareOption: "Square (1:1) - Post",
      fpsCinematic: "60 FPS Cinematic High",
      fpsStandard: "30 FPS Standard Social",
      nicheOptions: {
        travel: "Travel & Lifestyle",
        tech: "Tech & Coding",
        food: "Cooking & Food",
        comedy: "Comedy & Skits"
      }
    }
  }[lang];

  const [apiKeySet, setApiKeySet] = React.useState(true);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div id="settings-tab" className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 select-none max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Settings size={18} className="text-[#d0bcff]" />
          <span>{t.title}</span>
        </h2>
        <p className="text-xs text-[#cbc3d7]/80 mt-1">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Creator Profile information */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User size={16} className="text-[#d0bcff]" />
            <span>{t.creatorProfile}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.channelName}</label>
              <input 
                type="text" 
                defaultValue="Alex Rivera"
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.nicheCategory}</label>
              <select 
                defaultValue="Travel & Lifestyle"
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
              >
                <option value="Travel & Lifestyle">{t.nicheOptions.travel}</option>
                <option value="Tech & Coding">{t.nicheOptions.tech}</option>
                <option value="Cooking & Food">{t.nicheOptions.food}</option>
                <option value="Comedy & Skits">{t.nicheOptions.comedy}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Video Defaults configurer */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders size={16} className="text-[#4cd7f6]" />
            <span>{t.renderConfig}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.renderRatio}</label>
              <select 
                value={currentProject.resolution}
                onChange={(e) => onUpdateProjectDefaults({ resolution: e.target.value as ProjectInfo["resolution"] })}
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none font-bold animate-none"
              >
                <option value="16:9">{t.landscapeOption}</option>
                <option value="9:16">{t.portraitOption}</option>
                <option value="1:1">{t.squareOption}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.qualityStd}</label>
              <select 
                value={currentProject.quality}
                onChange={(e) => onUpdateProjectDefaults({ quality: e.target.value as ProjectInfo["quality"] })}
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
              >
                <option value="4K">4K UHD Master</option>
                <option value="1080p">1080p FHD Quality</option>
                <option value="720p">720p HD Standard</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.frameRate}</label>
              <select 
                value={currentProject.fps}
                onChange={(e) => onUpdateProjectDefaults({ fps: parseInt(e.target.value) as ProjectInfo["fps"] })}
                className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none"
              >
                <option value={60}>{t.fpsCinematic}</option>
                <option value={30}>{t.fpsStandard}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">{t.activeEditingStyle}</label>
            <input 
              type="text" 
              value={currentProject.editingStyle}
              onChange={(e) => onUpdateProjectDefaults({ editingStyle: e.target.value })}
              className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none animate-none" 
            />
          </div>
        </div>

        {/* Security / Secret Keys explanation */}
        <div className="bg-[#171f33] p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield size={16} className="text-red-400" />
                <span>{t.apiKeyMgmt}</span>
              </h3>
              <p className="text-xs text-[#cbc3d7]/80">
                {t.apiKeyDesc}
              </p>
            </div>
            <div className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold font-mono rounded-lg shrink-0">
              {t.securedPro}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b1326] border border-white/5 flex items-center gap-3">
            <Key size={16} className="text-[#d0bcff] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase font-bold text-[#cbc3d7]/60 block tracking-wider font-mono">{t.activeServiceKey}</span>
              <span className="text-xs text-white block truncate font-mono">•••••••••••••••••••••••••••••aistudio-v1</span>
            </div>
          </div>
        </div>

        {/* Save button & notifications */}
        <div className="flex items-center gap-4 justify-end">
          {savedSuccess && (
            <span className="text-xs text-green-400 font-bold flex items-center gap-1">
              <Check size={14} /> {t.saveSuccessMsg}
            </span>
          )}
          
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#d0bcff] text-[#3c0091] font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md shadow-[#d0bcff]/20"
          >
            {t.saveBtn}
          </button>
        </div>

      </form>

    </div>
  );
}
