import type {
  AIClip,
  CommentItem,
  ProjectInfo,
  TimelineItem,
  TrendItem,
} from "@/types/asap";

export const INITIAL_PROJECTS: ProjectInfo[] = [
  {
    id: "proj-1",
    name: "Summer_Vlog_01.mp4",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-mountains-and-lush-valley-at-sunset-41484-large.mp4",
    durationSeconds: 60,
    resolution: "16:9",
    quality: "4K",
    fps: 60,
    editingStyle: "Cinematic, rich color graded, high contrast teal & orange",
  },
  {
    id: "proj-2",
    name: "Urban_City_Timelapse.mp4",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-city-timelapse-44431-large.mp4",
    durationSeconds: 120,
    resolution: "9:16",
    quality: "1080p",
    fps: 30,
    editingStyle: "Fast-paced night aesthetic, neon speedup",
  },
  {
    id: "proj-3",
    name: "Tropical_Fruit_Smoothie.mp4",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-freshly-poured-fruit-smoothie-34246-large.mp4",
    durationSeconds: 45,
    resolution: "1:1",
    quality: "4K",
    fps: 60,
    editingStyle: "Smooth transitions, bright food lighting",
  },
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: "track-1",
    trackType: "video",
    title: "Intro_Sequence.mp4",
    startTime: 0,
    duration: 18,
    color: "from-[#a078ff]/20 to-transparent",
  },
  {
    id: "track-2",
    trackType: "video",
    title: "Main_Content_Vlog.mp4",
    startTime: 18,
    duration: 42,
    color: "from-[#a078ff]/30 to-transparent",
  },
  {
    id: "track-3",
    trackType: "audio",
    title: "Background_LoFi_02.wav",
    startTime: 5,
    duration: 50,
    color: "from-[#4cd7f6]/20 to-transparent",
    waveform: true,
  },
  {
    id: "track-4",
    trackType: "text",
    title: "Title Card: Summer Vibes",
    startTime: 10,
    duration: 15,
    color: "from-white/10 to-transparent",
  },
];

export const INITIAL_AI_CLIPS: AIClip[] = [
  {
    title: "The Perfect Transition",
    startTime: 12,
    endTime: 27,
    score: 98,
    platform: "TikTok",
    reason:
      "High contrast shift from bright skies to deep mountain valley, perfectly aligning with social trend pacing.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518173946687-a4c8a383392c?q=80&w=300&auto=format&fit=crop",
  },
  {
    title: "Cinematic City Night",
    startTime: 30,
    endTime: 54,
    score: 92,
    platform: "Instagram",
    reason:
      "Beautiful urban dark mode aesthetic with high resolution. Highly shared amongst lifestyle vlogs.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop",
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: "com-1",
    author: "Mia Thorne",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    commentText:
      "That transition at 0:15 was absolutely insane! How did you color grade this mountain landscape?",
    timestamp: "2 hours ago",
    platform: "TikTok",
    likes: 342,
  },
  {
    id: "com-2",
    author: "Lucas Vance",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    commentText:
      "Bro, this is pure aesthetic. What is the background music name? So chill.",
    timestamp: "5 hours ago",
    platform: "Instagram",
    likes: 128,
  },
  {
    id: "com-3",
    author: "Emily Chen",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    commentText:
      "Can you make a full checklist of locations from this Summer vlog? Slaying the social feeds lately!",
    timestamp: "1 day ago",
    platform: "YouTube",
    likes: 720,
  },
];

export const FALLBACK_TRENDS: TrendItem[] = [
  {
    trendName: "El Paneo Rápido de Atardecer",
    concept:
      "Comienza con un primer plano de un artículo de viaje, paneo rápido hacia una vista impresionante de un paisaje durante la hora dorada.",
    audioSuggestion: "Lo-Fi relajante y alegre",
    difficulty: "Easy",
    viewsCount: "4.2M vistas",
  },
  {
    trendName: "Zoom de Velocidad Suave",
    concept:
      "Sincroniza empujes rápidos de la cámara hacia adelante con ritmos de bajo de la música.",
    audioSuggestion: "Beats electrónicos de Synthwave",
    difficulty: "Medium",
    viewsCount: "8.1M vistas",
  },
  {
    trendName: "Comentarios con Títulos de Texto",
    concept:
      "Títulos con tipografía minimalista detallando guías de viaje con transiciones suaves de desvanecimiento.",
    audioSuggestion: "Guitarra acústica indie folk",
    difficulty: "Easy",
    viewsCount: "2.5M vistas",
  },
];

export const MOCK_AI_REPLIES = [
  "¡Gracias Mia! Usé un LUT personalizado con tonos teal & orange en DaVinci. La transición fue un whip pan a 120fps 🎬",
  "Hey Lucas! Es 'Lo-Fi Chill Beats Vol. 2' — link en bio si quieres la playlist completa 🎧",
  "Emily, ¡me encanta la idea! Estoy preparando un PDF con todas las ubicaciones del vlog. ¡Sígueme para no perdértelo! ✈️",
];

export const MOCK_CHAT_REPLIES = [
  "Los clips virales suelen tener un gancho visual en los primeros 3 segundos y un pico de audio que mantiene la atención.",
  "Arrastra los segmentos sugeridos desde el panel AI Clips directamente a la línea de tiempo multipista.",
  "Para Reels, mantén subtítulos dinámicos en el tercio inferior y cortes cada 2-3 segundos para maximizar retención.",
  "Sí, ASAP AI genera subtítulos estilizados con un clic desde el editor de video.",
];
