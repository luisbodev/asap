export type TrackType = "video" | "audio" | "text";

export interface TimelineItem {
  id: string;
  trackType: TrackType;
  title: string;
  startTime: number;
  duration: number;
  color: string;
  src?: string;
  waveform?: boolean;
}

export interface AIClip {
  title: string;
  startTime: number;
  endTime: number;
  score: number;
  platform: string;
  reason: string;
  thumbnailUrl?: string;
}

export interface CommentItem {
  id: string;
  author: string;
  avatarUrl: string;
  commentText: string;
  timestamp: string;
  platform: "TikTok" | "Instagram" | "YouTube";
  likes: number;
  replied?: boolean;
  replyText?: string;
}

export interface TrendItem {
  trendName: string;
  concept: string;
  audioSuggestion: string;
  difficulty: "Easy" | "Medium" | "Hard";
  viewsCount?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  sources?: Array<{ title: string; uri: string }>;
}

export interface ProjectInfo {
  id: string;
  name: string;
  videoUrl: string;
  durationSeconds: number;
  resolution: "16:9" | "9:16" | "1:1";
  quality: "4K" | "1080p" | "720p";
  fps: 30 | 60;
  editingStyle: string;
}

export type Lang = "es" | "en";
