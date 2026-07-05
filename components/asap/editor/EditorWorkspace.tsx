"use client";

import { useEffect, useState } from "react";
import { Sparkles, Menu } from "lucide-react";
import { AsapLogo } from "@/components/asap/layout/AsapLogo";
import { useAppDemo } from "@/context/AppDemoContext";
import { DEFAULT_DESCRIPTION } from "@/context/AppDemoContext";
import type { AIClip } from "@/types/asap";
import AIClipsPanel from "@/components/asap/editor/AIClipsPanel";
import EditorTimeline from "@/components/asap/editor/EditorTimeline";
import VideoPlayer from "@/components/asap/editor/VideoPlayer";
import WorkspaceHeader from "@/components/asap/editor/WorkspaceHeader";

export function EditorWorkspace() {
  const {
    lang,
    currentProject,
    aiClips,
    timelineItems,
    setTimelineItems,
    regenerateClips,
    isGeneratingClips,
    showToastWith,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useAppDemo();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(12.45);
  const [selectedItemId, setSelectedItemId] = useState<string | null>("track-1");
  const [videoDescription, setVideoDescription] = useState(DEFAULT_DESCRIPTION);

  useEffect(() => {
    if (currentProject.id === "proj-2") {
      setVideoDescription(
        "A stellar timelapse panning across neon skyscrapers under a dark starry city sky. Energetic speed-ramped lifestyle transitions."
      );
    } else if (currentProject.id === "proj-3") {
      setVideoDescription(
        "Healthy tutorial cooking bowl, dynamic close ups of strawberry smoothies pouring in bright studio lightning."
      );
    } else {
      setVideoDescription(DEFAULT_DESCRIPTION);
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, [currentProject.id]);

  const handleAddClipToTimeline = (clip: AIClip) => {
    setTimelineItems((prev) => [
      ...prev,
      {
        id: `track-video-${Date.now()}`,
        trackType: "video",
        title: clip.title,
        startTime: clip.startTime,
        duration: clip.endTime - clip.startTime,
        color: "from-[#a078ff]/40 to-transparent",
      },
    ]);
  };

  const handleGenerateSubtitleCard = async () => {
    const activeItem = timelineItems.find((i) => i.id === selectedItemId);
    if (!activeItem) return;
    setTimelineItems((prev) =>
      prev.map((item) =>
        item.id === activeItem.id
          ? { ...item, title: "Title Card: Summer vibes hit different at golden hour ✨" }
          : item
      )
    );
  };

  return (
    <>
      {sidebarCollapsed && (
        <button
          type="button"
          onClick={() => setSidebarCollapsed(false)}
          title={lang === "es" ? "Mostrar menú lateral" : "Expand sidebar"}
          className="absolute left-4 top-4 z-50 p-2 rounded-xl bg-[#131b2e] border border-white/10 text-[#d0bcff] hover:bg-white/15 hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <AsapLogo size="xs" />
          <Menu size={16} />
        </button>
      )}

      <WorkspaceHeader
        project={currentProject}
        lang={lang}
        onShareClick={() =>
          showToastWith({
            title: lang === "es" ? "Enlace Copiado" : "Share Link Copied",
            description:
              lang === "es"
                ? "El enlace del borrador colaborativo ha sido copiado a tu portapapeles."
                : "The collaborative draft URL has been successfully copied into your system clipboard.",
            actionText: lang === "es" ? "Excelente" : "Awesome",
          })
        }
        onExportClick={() =>
          showToastWith({
            title: lang === "es" ? "Proceso de Compilación" : "Compilation Process Initialized",
            description:
              lang === "es"
                ? "Se ha iniciado la exportación en 4K. Sigue el progreso en la pestaña de Calendario."
                : "Your 4K timeline render has launched. Track progress inside the visual scheduler tab.",
            actionText: lang === "es" ? "Ver Calendario" : "View Calendar",
          })
        }
      />

      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 flex overflow-hidden min-h-0">
          <div className="flex-1 flex flex-col relative overflow-hidden bg-[#060e20]">
            <VideoPlayer
              project={currentProject}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              videoUrl={currentProject.videoUrl}
            />
            <div className="absolute bottom-16 right-6 z-10">
              <button
                type="button"
                onClick={handleGenerateSubtitleCard}
                className="px-3 py-1.5 rounded-lg bg-[#a078ff]/20 text-[#d0bcff] hover:bg-[#a078ff]/35 border border-[#d0bcff]/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#a078ff]/10"
              >
                <Sparkles size={13} className="text-[#4cd7f6] animate-bounce" />
                <span>Generate Active Subtitle</span>
              </button>
            </div>
          </div>

          <AIClipsPanel
            clips={aiClips}
            onAddClipToTimeline={handleAddClipToTimeline}
            onPreviewClipRange={(start) => {
              setCurrentTime(start);
              setIsPlaying(true);
            }}
            onRegenerateClips={regenerateClips}
            isGenerating={isGeneratingClips}
            videoDescription={videoDescription}
            setVideoDescription={setVideoDescription}
            lang={lang}
          />
        </div>

        <EditorTimeline
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          durationSeconds={currentProject.durationSeconds}
          timelineItems={timelineItems}
          setTimelineItems={setTimelineItems}
          selectedItemId={selectedItemId}
          onSelectItem={(item) => setSelectedItemId(item.id)}
        />
      </div>
    </>
  );
}
