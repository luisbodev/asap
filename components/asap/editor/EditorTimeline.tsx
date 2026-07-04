"use client";

import React, { useRef } from "react";
import {
  Undo2, Redo2, Scissors, Copy,
  Trash2, ZoomIn, ZoomOut, Film, Music, Type as TextIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TimelineItem } from "@/types/asap";

interface EditorTimelineProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  durationSeconds: number;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  onSelectItem: (item: TimelineItem) => void;
  selectedItemId: string | null;
}

export default function EditorTimeline({
  currentTime,
  setCurrentTime,
  durationSeconds,
  timelineItems,
  setTimelineItems,
  onSelectItem,
  selectedItemId,
}: EditorTimelineProps) {
  const rulerRef = useRef<HTMLDivElement>(null);

  // Width in pixels of 1 second of timeline
  const [zoom, setZoom] = React.useState(20); // px per second

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + rulerRef.current.scrollLeft;
    let clickTime = clickX / zoom;
    if (clickTime < 0) clickTime = 0;
    if (clickTime > durationSeconds) clickTime = durationSeconds;
    setCurrentTime(clickTime);
  };

  const deleteItem = (id: string) => {
    setTimelineItems(prev => prev.filter(item => item.id !== id));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Generate ruler tick marks
  const ticks = [];
  const tickStep = durationSeconds > 120 ? 10 : 5; // seconds between ticks
  for (let i = 0; i <= durationSeconds; i += tickStep) {
    ticks.push(i);
  }

  // Group timeline items by track type
  const tracks: { type: "video" | "audio" | "text"; icon: LucideIcon; color: string }[] = [
    { type: "video", icon: Film, color: "from-[#a078ff]/10 to-transparent" },
    { type: "audio", icon: Music, color: "from-[#4cd7f6]/10 to-transparent" },
    { type: "text", icon: TextIcon, color: "from-white/5 to-transparent" },
  ];

  return (
    <div id="editor-timeline" className="h-64 border-t border-white/10 bg-[#060e20] flex flex-col shrink-0 select-none overflow-hidden">
      
      {/* Timeline Controls bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 bg-[#131b2e]">
        <div className="flex items-center gap-4">
          
          {/* Undo / Redo */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-white/5 transition-all cursor-pointer" title="Undo">
              <Undo2 size={16} />
            </button>
            <button className="p-1.5 rounded text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-white/5 transition-all cursor-pointer" title="Redo">
              <Redo2 size={16} />
            </button>
          </div>
          
          <div className="h-4 w-[1px] bg-white/10" />
          
          {/* Slicing Tools */}
          <div className="flex items-center gap-1">
            <button 
              className="p-1.5 rounded text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-white/5 transition-all cursor-pointer" 
              title="Split Segment at Playhead"
            >
              <Scissors size={16} />
            </button>
            <button 
              className="p-1.5 rounded text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-white/5 transition-all cursor-pointer" 
              title="Copy Segment"
            >
              <Copy size={16} />
            </button>
            {selectedItemId && (
              <button 
                onClick={() => deleteItem(selectedItemId)}
                className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer" 
                title="Delete Selected Segment"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Playhead position metadata & zoom */}
        <div className="flex items-center gap-6">
          <div className="font-mono text-xs text-[#cbc3d7]">
            <span className="text-[#d0bcff] font-bold">{formatTime(currentTime)}</span>
            <span className="opacity-40"> / {formatTime(durationSeconds)}</span>
          </div>

          {/* Timeline Zoom */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(prev => Math.max(10, prev - 5))}
              className="p-1 text-[#cbc3d7] hover:text-white cursor-pointer"
            >
              <ZoomOut size={16} />
            </button>
            <div className="w-24 h-1 bg-white/10 rounded-full relative">
              <div 
                className="absolute left-0 top-0 h-full bg-[#d0bcff] rounded-full"
                style={{ width: `${((zoom - 10) / 40) * 100}%` }}
              />
            </div>
            <button 
              onClick={() => setZoom(prev => Math.min(50, prev + 5))}
              className="p-1 text-[#cbc3d7] hover:text-white cursor-pointer"
            >
              <ZoomIn size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Scrollable Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-[#020617] relative flex flex-col">
        
        {/* Time ruler */}
        <div 
          ref={rulerRef}
          onClick={handleRulerClick}
          className="h-8 border-b border-white/5 relative cursor-ew-resize select-none shrink-0"
          style={{ width: `${durationSeconds * zoom + 120}px` }}
        >
          {ticks.map((t) => (
            <div 
              key={t} 
              className="absolute bottom-0 h-4 border-l border-white/10 flex flex-col justify-end pb-1 pl-1"
              style={{ left: `${t * zoom + 80}px` }}
            >
              <span className="font-mono text-[9px] text-white/30 leading-none">{formatTime(t)}</span>
            </div>
          ))}
        </div>

        {/* Tracks container */}
        <div 
          className="flex-1 p-3 space-y-2 relative"
          style={{ width: `${durationSeconds * zoom + 120}px` }}
        >
          {/* Vertical Playhead Line overlay */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-[#d0bcff] z-20 pointer-events-none shadow-[0_0_8px_rgba(208,188,255,0.8)]"
            style={{ left: `${currentTime * zoom + 80}px` }}
          >
            <div className="w-3 h-3 bg-[#d0bcff] rounded-sm -ml-[6px] transform rotate-45 border border-white/20 shadow-md" />
          </div>

          {tracks.map((track) => {
            const trackItems = timelineItems.filter(item => item.trackType === track.type);
            const TrackIconComponent = track.icon;

            return (
              <div key={track.type} className="flex items-center h-12 relative">
                {/* Track label left rail */}
                <div className="w-16 h-full flex flex-col items-center justify-center text-[#cbc3d7] shrink-0 border-r border-white/5 bg-[#060e20] z-10 sticky left-0 shadow-md">
                  <TrackIconComponent size={18} className="opacity-75" />
                  <span className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-50">{track.type}</span>
                </div>

                {/* Track channel timeline space */}
                <div className="flex-1 h-full bg-black/20 rounded-lg relative overflow-hidden ml-4">
                  {trackItems.map((item) => {
                    const isSelected = selectedItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        style={{
                          left: `${item.startTime * zoom}px`,
                          width: `${item.duration * zoom}px`,
                        }}
                        className={`absolute top-1 bottom-1 rounded-lg border flex items-center px-3 cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-[#d0bcff]/20 border-[#d0bcff] shadow-[0_0_10px_rgba(208,188,255,0.2)]" 
                            : "bg-[#131b2e]/60 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {/* Shimmer/gradient look */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-40 rounded-lg`} />
                        
                        {/* Waveform graphic for audio */}
                        {item.trackType === "audio" && (
                          <div className="absolute inset-x-2 bottom-1 h-4 flex items-end gap-[1px] opacity-20 pointer-events-none">
                            <div className="bg-[#4cd7f6] h-1 w-full" />
                            <div className="bg-[#4cd7f6] h-3 w-full" />
                            <div className="bg-[#4cd7f6] h-1.5 w-full" />
                            <div className="bg-[#4cd7f6] h-4 w-full" />
                            <div className="bg-[#4cd7f6] h-2 w-full" />
                            <div className="bg-[#4cd7f6] h-1 w-full" />
                            <div className="bg-[#4cd7f6] h-3.5 w-full" />
                            <div className="bg-[#4cd7f6] h-2.5 w-full" />
                          </div>
                        )}

                        <span className={`text-[10px] font-bold truncate z-10 ${isSelected ? "text-white" : "text-[#cbc3d7]"}`}>
                          {item.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
