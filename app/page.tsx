"use client";

import LandingTab from "@/components/asap/landing/LandingTab";
import { SocialConnectModal } from "@/components/asap/modals/SocialConnectModal";
import { useAppDemo } from "@/context/AppDemoContext";

export default function HomePage() {
  const { lang, setLang, isLoggedIn, userProfileName, handleLogin, handleLogout } =
    useAppDemo();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0b1326]">
      <LandingTab
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userProfileName={userProfileName}
        lang={lang}
        onChangeLang={setLang}
      />
      <SocialConnectModal />
    </div>
  );
}
