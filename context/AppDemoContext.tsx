"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FALLBACK_TRENDS,
  INITIAL_AI_CLIPS,
  INITIAL_COMMENTS,
  INITIAL_PROJECTS,
  INITIAL_TIMELINE,
  MOCK_AI_REPLIES,
  MOCK_CHAT_REPLIES,
} from "@/lib/mocks/asap-app.mock";
import type {
  AIClip,
  ChatMessage,
  CommentItem,
  Lang,
  ProjectInfo,
  TimelineItem,
  TrendItem,
} from "@/types/asap";

type ToastState = {
  title: string;
  description: string;
  actionText: string;
};

type AppDemoContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isLoggedIn: boolean;
  userProfileName: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  projects: ProjectInfo[];
  currentProject: ProjectInfo;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectInfo>>;
  selectProject: (p: ProjectInfo) => void;
  comments: CommentItem[];
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  showToast: boolean;
  toastMessage: ToastState;
  setShowToast: (v: boolean) => void;
  showToastWith: (msg: ToastState) => void;
  showNewVideoModal: boolean;
  setShowNewVideoModal: (v: boolean) => void;
  showSocialConnectModal: boolean;
  setShowSocialConnectModal: (v: boolean) => void;
  handleLogin: (username: string) => void;
  handleCompleteSocialLogin: () => void;
  skipSocialLogin: () => void;
  handleLogout: () => void;
  createProject: (params: {
    name: string;
    ratio: "16:9" | "9:16" | "1:1";
    style: string;
  }) => void;
  generateCommentReply: (
    commentText: string,
    author: string,
    tone: string
  ) => Promise<string>;
  suggestTrends: (category: string) => Promise<TrendItem[]>;
  sendChatMessage: (text: string, history: ChatMessage[]) => Promise<string>;
  // Editor state shared across editor page
  aiClips: AIClip[];
  setAiClips: React.Dispatch<React.SetStateAction<AIClip[]>>;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  regenerateClips: (desc: string) => Promise<void>;
  isGeneratingClips: boolean;
};

const AppDemoContext = createContext<AppDemoContextValue | null>(null);

const DEFAULT_DESCRIPTION =
  "A gorgeous travel vlog showcasing lush tropical mountain peaks at golden hour sunset, transitioning into dynamic lo-fi background vibes with a clean overlay.";

export function AppDemoProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userProfileName, setUserProfileName] = useState("Alex Rivera");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingUsername, setPendingUsername] = useState("");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [currentProject, setCurrentProject] = useState(INITIAL_PROJECTS[0]);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [aiClips, setAiClips] = useState(INITIAL_AI_CLIPS);
  const [timelineItems, setTimelineItems] = useState(INITIAL_TIMELINE);
  const [isGeneratingClips, setIsGeneratingClips] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastState>({
    title: "AI Analysis Complete",
    description:
      "Found 12 viral-ready segments in your footage. Would you like to auto-crop them for Reels?",
    actionText: "Apply Suggestions",
  });
  const [showNewVideoModal, setShowNewVideoModal] = useState(false);
  const [showSocialConnectModal, setShowSocialConnectModal] = useState(false);

  const showToastWith = useCallback((msg: ToastState) => {
    setToastMessage(msg);
    setShowToast(true);
  }, []);

  const selectProject = useCallback((proj: ProjectInfo) => {
    setCurrentProject(proj);
  }, []);

  const handleLogin = useCallback((username: string) => {
    setPendingUsername(username);
    setShowSocialConnectModal(true);
  }, []);

  const handleCompleteSocialLogin = useCallback(() => {
    const finalUsername = pendingUsername || "Alex Rivera";
    setUserProfileName(finalUsername);
    setIsLoggedIn(true);
    setShowSocialConnectModal(false);
    showToastWith({
      title: lang === "es" ? "¡Cuentas Vinculadas!" : "Accounts Linked!",
      description:
        lang === "es"
          ? `¡Bienvenido, ${finalUsername}! Redes sociales conectadas al calendario de forma exitosa.`
          : `Welcome, ${finalUsername}! Social media networks successfully integrated with your editorial calendar.`,
      actionText: lang === "es" ? "Ir al Dashboard" : "Go to Dashboard",
    });
  }, [lang, pendingUsername, showToastWith]);

  const skipSocialLogin = useCallback(() => {
    setUserProfileName(pendingUsername || "Alex Rivera");
    setIsLoggedIn(true);
    setShowSocialConnectModal(false);
  }, [pendingUsername]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserProfileName("Invitado");
    showToastWith({
      title: "Sesión Cerrada",
      description:
        "Has salido de tu cuenta de forma segura. Vuelve pronto para seguir creando.",
      actionText: "Ver Beneficios",
    });
  }, [showToastWith]);

  const createProject = useCallback(
    (params: { name: string; ratio: "16:9" | "9:16" | "1:1"; style: string }) => {
      const newProj: ProjectInfo = {
        id: `proj-${Date.now()}`,
        name: params.name.endsWith(".mp4") ? params.name : `${params.name}.mp4`,
        videoUrl:
          "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-city-timelapse-44431-large.mp4",
        durationSeconds: 120,
        resolution: params.ratio,
        quality: "4K",
        fps: 60,
        editingStyle: params.style || "Standard clean social edit",
      };
      setProjects((prev) => [newProj, ...prev]);
      setCurrentProject(newProj);
      setShowNewVideoModal(false);
    },
    []
  );

  const regenerateClips = useCallback(async (_desc: string) => {
    setIsGeneratingClips(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAiClips([
      ...INITIAL_AI_CLIPS,
      {
        title: "Golden Hour Peak",
        startTime: 8,
        endTime: 22,
        score: 95,
        platform: "TikTok",
        reason: "Dramatic lighting shift with high emotional retention curve.",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=300&auto=format&fit=crop",
      },
    ]);
    setIsGeneratingClips(false);
    showToastWith({
      title: "AI Analysis Complete",
      description: "Identified 3 new viral segments. Click apply to queue them into editor timeline tracks.",
      actionText: "Apply All Tracks",
    });
  }, [showToastWith]);

  const generateCommentReply = useCallback(
    async (_commentText: string, _author: string, _tone: string) => {
      await new Promise((r) => setTimeout(r, 800));
      return MOCK_AI_REPLIES[Math.floor(Math.random() * MOCK_AI_REPLIES.length)];
    },
    []
  );

  const suggestTrends = useCallback(async (_category: string) => {
    await new Promise((r) => setTimeout(r, 900));
    return FALLBACK_TRENDS;
  }, []);

  const sendChatMessage = useCallback(async (_text: string, _history: ChatMessage[]) => {
    await new Promise((r) => setTimeout(r, 1000));
    return MOCK_CHAT_REPLIES[Math.floor(Math.random() * MOCK_CHAT_REPLIES.length)];
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      isLoggedIn,
      userProfileName,
      sidebarCollapsed,
      setSidebarCollapsed,
      projects,
      currentProject,
      setCurrentProject,
      selectProject,
      comments,
      setComments,
      showToast,
      toastMessage,
      setShowToast,
      showToastWith,
      showNewVideoModal,
      setShowNewVideoModal,
      showSocialConnectModal,
      setShowSocialConnectModal,
      handleLogin,
      handleCompleteSocialLogin,
      skipSocialLogin,
      handleLogout,
      createProject,
      generateCommentReply,
      suggestTrends,
      sendChatMessage,
      aiClips,
      setAiClips,
      timelineItems,
      setTimelineItems,
      regenerateClips,
      isGeneratingClips,
    }),
    [
      lang,
      isLoggedIn,
      userProfileName,
      sidebarCollapsed,
      projects,
      currentProject,
      selectProject,
      comments,
      showToast,
      toastMessage,
      showToastWith,
      showNewVideoModal,
      showSocialConnectModal,
      handleLogin,
      handleCompleteSocialLogin,
      skipSocialLogin,
      handleLogout,
      createProject,
      generateCommentReply,
      suggestTrends,
      sendChatMessage,
      aiClips,
      timelineItems,
      regenerateClips,
      isGeneratingClips,
    ]
  );

  return (
    <AppDemoContext.Provider value={value}>{children}</AppDemoContext.Provider>
  );
}

export function useAppDemo() {
  const ctx = useContext(AppDemoContext);
  if (!ctx) throw new Error("useAppDemo must be used within AppDemoProvider");
  return ctx;
}

export { DEFAULT_DESCRIPTION };
