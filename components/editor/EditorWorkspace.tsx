"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/layout/MaterialIcon";
import { AI_CLIPS, EDITOR_PROJECT } from "@/lib/mocks/editor.mock";

function AIClipCard({
  clip,
}: {
  clip: (typeof AI_CLIPS)[0];
}) {
  if (clip.generating) {
    return (
      <div className="glass-card rounded-xl p-xs opacity-60">
        <div className="relative rounded-lg overflow-hidden h-32 mb-xs bg-black/40 flex items-center justify-center">
          <MaterialIcon name="refresh" className="text-primary text-[32px] animate-spin" />
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">
            Generating...
          </div>
        </div>
        <div className="px-xs pb-xs">
          <p className="font-label-sm text-on-surface truncate">{clip.title}</p>
          <p className="text-[10px] text-on-surface-variant">{clip.recommendation}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-xs hover:border-primary/50 transition-all cursor-pointer group">
      <div className="relative rounded-lg overflow-hidden h-32 mb-xs">
        <Image
          src={clip.thumbnail}
          alt={clip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-bold text-white backdrop-blur-sm">
          {clip.duration}
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-on-secondary-container text-[10px] font-bold shadow-lg">
          <MaterialIcon name="trending_up" className="text-[12px]" />
          {clip.score} Score
        </div>
      </div>
      <div className="px-xs pb-xs">
        <p className="font-label-sm text-on-surface truncate">{clip.title}</p>
        <p className="text-[10px] text-on-surface-variant">{clip.recommendation}</p>
      </div>
    </div>
  );
}

function AIToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-gutter right-gutter glass-card p-md rounded-xl shadow-2xl z-50 flex items-start gap-md max-w-sm animate-in fade-in slide-in-from-bottom-4">
      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
        <MaterialIcon name="auto_awesome" className="text-secondary animate-pulse" />
      </div>
      <div>
        <p className="font-label-sm text-label-sm font-bold text-on-surface">
          AI Analysis Complete
        </p>
        <p className="font-body-md text-[12px] text-on-surface-variant mt-1 leading-relaxed">
          Found 12 viral-ready segments in your footage. Would you like to auto-crop
          them for Reels?
        </p>
        <div className="flex items-center gap-sm mt-md">
          <button className="px-sm py-1.5 rounded bg-secondary text-on-secondary-container text-[11px] font-bold">
            Apply Suggestions
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-sm py-1.5 rounded border border-white/10 text-[11px] font-medium hover:bg-white/5"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditorPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const handleWheel = (evt: WheelEvent) => {
      evt.preventDefault();
      timeline.scrollLeft += evt.deltaY;
    };

    timeline.addEventListener("wheel", handleWheel, { passive: false });
    return () => timeline.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-gutter py-sm border-b border-white/5 bg-surface-container-low/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-2">
            <MaterialIcon name="folder" className="text-on-surface-variant" />
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Projects /{" "}
            </span>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">
              {EDITOR_PROJECT.filename}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-[10px] border border-primary/20">
            {EDITOR_PROJECT.status}
          </span>
        </div>
        <div className="flex items-center gap-sm">
          <button className="px-md py-sm flex items-center gap-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-label-sm text-label-sm">
            <MaterialIcon name="share" className="text-[18px]" />
            Share
          </button>
          <button className="px-md py-sm flex items-center gap-2 rounded-lg bg-secondary text-on-secondary-container font-bold hover:opacity-90 transition-opacity font-label-sm text-label-sm">
            <MaterialIcon name="ios_share" className="text-[18px]" />
            Export to Socials
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div className="flex-1 flex flex-col p-md relative overflow-hidden bg-surface-container-lowest min-w-0">
          <div className="flex-1 relative flex items-center justify-center rounded-xl overflow-hidden group min-h-0">
            <div className="absolute inset-0 bg-black">
              <Image
                src={EDITOR_PROJECT.preview}
                alt="Video preview"
                fill
                className="object-cover opacity-80"
              />
            </div>
            <div className="absolute inset-x-0 bottom-12 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="glass-card px-md py-xs rounded-full flex items-center gap-md">
                <button className="text-on-surface hover:text-primary transition-colors">
                  <MaterialIcon name="fast_rewind" />
                </button>
                <button className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <MaterialIcon name="play_arrow" filled className="text-[28px]" />
                </button>
                <button className="text-on-surface hover:text-primary transition-colors">
                  <MaterialIcon name="fast_forward" />
                </button>
              </div>
            </div>
            <div className="absolute top-sm left-sm flex flex-col gap-xs">
              <div className="glass-card px-xs py-base rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-label-sm text-[10px] text-white/80">
                  4K | 60FPS
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-md left-md right-md h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-2/3 ai-shimmer rounded-full" />
          </div>
        </div>

        <div className="w-80 border-l border-white/5 bg-surface-container flex flex-col overflow-hidden shrink-0">
          <div className="p-md border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MaterialIcon name="auto_awesome" className="text-secondary" />
              <span className="font-headline-md text-[18px] text-on-surface">
                AI Clips
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold border border-secondary/20 uppercase tracking-tighter">
              New Hits
            </span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-sm space-y-sm">
            {AI_CLIPS.map((clip) => (
              <AIClipCard key={clip.id} clip={clip} />
            ))}
          </div>
          <div className="p-md border-t border-white/5">
            <button className="w-full py-sm rounded-lg border border-secondary/30 text-secondary font-label-sm text-label-sm hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2">
              <MaterialIcon name="sync" className="text-[18px]" />
              Regenerate Clips
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 border-t border-white/10 bg-surface-container-lowest flex flex-col shrink-0">
        <div className="flex items-center justify-between px-md py-base border-b border-white/5 bg-surface-container-low">
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-xs">
              {["undo", "redo"].map((icon) => (
                <button
                  key={icon}
                  className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <MaterialIcon name={icon} className="text-[20px]" />
                </button>
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-xs">
              {["content_cut", "content_copy", "content_paste"].map((icon) => (
                <button
                  key={icon}
                  className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <MaterialIcon name={icon} className="text-[20px]" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-md">
            <span className="font-label-sm text-label-sm text-primary">
              {EDITOR_PROJECT.currentTime} / {EDITOR_PROJECT.totalTime}
            </span>
            <div className="flex items-center gap-xs">
              <button className="p-1 text-on-surface-variant">
                <MaterialIcon name="zoom_out" className="text-[20px]" />
              </button>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-primary" />
              </div>
              <button className="p-1 text-on-surface-variant">
                <MaterialIcon name="zoom_in" className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={timelineRef}
          className="flex-1 overflow-x-auto custom-scrollbar bg-[#020617] relative min-h-0"
        >
          <div className="h-6 border-b border-white/5 flex items-end px-2 gap-10 text-[9px] text-white/30 font-mono select-none min-w-[2000px]">
            {["00:00", "00:05", "00:10", "00:15", "00:20", "00:25", "00:30", "00:35", "00:40", "00:45"].map(
              (t) => (
                <span key={t}>{t}</span>
              )
            )}
          </div>
          <div className="absolute top-0 bottom-0 left-[35%] w-px bg-primary z-10 pointer-events-none shadow-[0_0_10px_rgba(208,188,255,0.8)]">
            <div className="w-3 h-3 bg-primary rounded-sm -ml-[6px] transform rotate-45" />
          </div>
          <div className="p-md space-y-2 min-w-[2000px]">
            <div className="flex items-center gap-xs h-12">
              <div className="w-16 shrink-0 flex items-center justify-center text-on-surface-variant">
                <MaterialIcon name="videocam" className="text-[20px]" />
              </div>
              <div className="flex-1 flex gap-px h-full">
                <div className="w-[400px] h-full bg-primary/20 border border-primary/40 rounded-lg flex items-center px-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
                  <span className="text-[11px] font-bold text-primary z-10 truncate">
                    Intro_Sequence.mp4
                  </span>
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary/40 cursor-ew-resize" />
                </div>
                <div className="w-[600px] h-full bg-primary/20 border border-primary/40 rounded-lg flex items-center px-sm overflow-hidden relative border-l-primary shadow-inner">
                  <span className="text-[11px] font-bold text-primary z-10 truncate">
                    Main_Content_Vlog.mp4
                  </span>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary/40 cursor-ew-resize" />
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary/40 cursor-ew-resize" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-xs h-10">
              <div className="w-16 shrink-0 flex items-center justify-center text-on-surface-variant">
                <MaterialIcon name="mic" className="text-[20px]" />
              </div>
              <div className="flex-1 h-full">
                <div className="ml-[50px] w-[800px] h-full bg-secondary/20 border border-secondary/40 rounded-lg flex items-center px-sm relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-1 h-6 flex items-end gap-[1px] px-2 opacity-40">
                    {[2, 4, 1, 5, 3, 6, 2, 4, 1, 5, 3, 6].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-secondary"
                        style={{ height: `${h * 4}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-secondary z-10">
                    Background_LoFi_02.wav
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-xs h-10">
              <div className="w-16 shrink-0 flex items-center justify-center text-on-surface-variant">
                <MaterialIcon name="title" className="text-[20px]" />
              </div>
              <div className="flex-1 h-full flex items-center">
                <div className="ml-[200px] w-48 h-6 bg-white/10 border border-white/20 rounded flex items-center justify-center">
                  <span className="text-[10px] font-medium text-white/80">
                    Title Card: Summer Vibes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIToast />
    </>
  );
}
