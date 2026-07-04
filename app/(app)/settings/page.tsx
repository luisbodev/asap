"use client";

import SettingsTab from "@/components/asap/settings/SettingsTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function SettingsPage() {
  const { lang, currentProject, setCurrentProject } = useAppDemo();
  return (
    <SettingsTab
      currentProject={currentProject}
      onUpdateProjectDefaults={(params) =>
        setCurrentProject((prev) => ({ ...prev, ...params }))
      }
      lang={lang}
    />
  );
}
