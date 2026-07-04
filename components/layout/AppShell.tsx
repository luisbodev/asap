"use client";

import { useEffect } from "react";
import { AppSidebar } from "@/components/asap/layout/AppSidebar";
import { AIToast } from "@/components/asap/modals/AIToast";
import { NewVideoModal } from "@/components/asap/modals/NewVideoModal";
import { SocialConnectModal } from "@/components/asap/modals/SocialConnectModal";
import { useAppDemo } from "@/context/AppDemoContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { setShowToast } = useAppDemo();

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 2800);
    return () => clearTimeout(timer);
  }, [setShowToast]);

  return (
    <div
      id="asap-layout"
      className="flex h-screen w-full bg-[#0b1326] text-[#dae2fd] font-sans overflow-hidden"
    >
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen relative bg-[#0b1326] overflow-hidden min-w-0">
        {children}
      </main>
      <AIToast />
      <NewVideoModal />
      <SocialConnectModal />
    </div>
  );
}
