"use client";

import TrendsTab from "@/components/asap/trends/TrendsTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function TrendsPage() {
  const { lang, suggestTrends } = useAppDemo();
  return <TrendsTab onSuggestTrends={suggestTrends} lang={lang} />;
}
