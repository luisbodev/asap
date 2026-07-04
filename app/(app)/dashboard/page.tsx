"use client";

import DashboardTab from "@/components/asap/dashboard/DashboardTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function DashboardPage() {
  const { lang, projects, currentProject, selectProject, setShowNewVideoModal } = useAppDemo();

  return (
    <DashboardTab
      projects={projects}
      currentProject={currentProject}
      onSelectProject={selectProject}
      onNewVideoClick={() => setShowNewVideoModal(true)}
      lang={lang}
    />
  );
}
