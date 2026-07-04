"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDemo } from "@/context/AppDemoContext";

export function AIToast() {
  const router = useRouter();
  const { showToast, toastMessage, setShowToast, timelineItems, setTimelineItems, aiClips } =
    useAppDemo();

  if (!showToast) return null;

  const handleAction = () => {
    if (
      toastMessage.actionText.includes("Calendar") ||
      toastMessage.actionText.includes("Calendario")
    ) {
      router.push("/scheduler");
    } else if (toastMessage.actionText.includes("Apply") || toastMessage.actionText.includes("Aplicar")) {
      const itemsToAdd = aiClips.map((clip, idx) => ({
        id: `toast-clip-${idx}-${Date.now()}`,
        trackType: "video" as const,
        title: clip.title,
        startTime: clip.startTime,
        duration: clip.endTime - clip.startTime,
        color: "from-[#a078ff]/40 to-[#4cd7f6]/20",
      }));
      setTimelineItems([...timelineItems, ...itemsToAdd]);
    } else if (
      toastMessage.actionText.includes("Dashboard") ||
      toastMessage.actionText.includes("Dashboard")
    ) {
      router.push("/dashboard");
    }
    setShowToast(false);
  };

  return (
    <div
      id="ai-toast"
      className="fixed bottom-6 right-6 bg-[#171f33]/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl z-50 flex items-start gap-4 max-w-sm border border-[#4cd7f6]/20 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 flex items-center justify-center shrink-0">
        <Sparkles className="text-[#4cd7f6] animate-pulse" size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-white">{toastMessage.title}</p>
        <p className="text-xs text-[#cbc3d7] mt-1 leading-relaxed">{toastMessage.description}</p>
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleAction}
            className="px-3.5 py-1.5 rounded-lg bg-[#4cd7f6] text-[#001f26] text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md shadow-[#4cd7f6]/20"
          >
            {toastMessage.actionText}
          </button>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-[#cbc3d7] font-bold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
