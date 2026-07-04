"use client";

import SchedulerTab from "@/components/asap/scheduler/SchedulerTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function SchedulerPage() {
  const { lang, currentProject } = useAppDemo();
  return <SchedulerTab currentProject={currentProject} lang={lang} />;
}
