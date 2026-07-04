"use client";

import { useState } from "react";
import { Film, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDemo } from "@/context/AppDemoContext";

export function NewVideoModal() {
  const router = useRouter();
  const { showNewVideoModal, setShowNewVideoModal, createProject } = useAppDemo();
  const [name, setName] = useState("");
  const [ratio, setRatio] = useState<"16:9" | "9:16" | "1:1">("16:9");
  const [style, setStyle] = useState("");

  if (!showNewVideoModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createProject({ name: name.trim(), ratio, style });
    setName("");
    setStyle("");
    router.push("/editor");
  };

  return (
    <div
      id="new-video-modal"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-[#171f33] border border-white/5 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl relative">
        <button
          type="button"
          onClick={() => setShowNewVideoModal(false)}
          className="absolute top-4 right-4 text-[#cbc3d7] hover:text-white cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2">
          <Film className="text-[#d0bcff]" size={20} />
          <h3 className="text-base font-extrabold text-white">Create New Video Project</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
              Video Filename
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Winter_Vlog_01"
              className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
              Platform Aspect Ratio Preset
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "16:9" as const, label: "Landscape 16:9" },
                { value: "9:16" as const, label: "Portrait 9:16" },
                { value: "1:1" as const, label: "Square 1:1" },
              ].map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setRatio(r.value)}
                  className={`py-2 px-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                    ratio === r.value
                      ? "bg-[#d0bcff]/10 text-[#d0bcff] border-[#d0bcff]"
                      : "bg-[#0b1326] border-white/5 text-[#cbc3d7] hover:border-white/10"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider font-mono">
              Desired Editing / Color Grading Style
            </label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="e.g. cinematic, heavy contrast, teal and orange"
              className="w-full bg-[#0b1326] text-xs text-white rounded-lg p-2.5 border border-white/10 focus:border-[#d0bcff] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-[#a078ff] to-[#4cd7f6] text-[#001f26] font-bold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-[#a078ff]/15"
          >
            Launch Workspace
          </button>
        </form>
      </div>
    </div>
  );
}
