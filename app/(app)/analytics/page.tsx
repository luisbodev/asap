"use client";

import AnalyticsTab from "@/components/asap/analytics/AnalyticsTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function AnalyticsPage() {
  const { lang } = useAppDemo();
  return <AnalyticsTab lang={lang} />;
}
