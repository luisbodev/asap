export type ScheduledPost = {
  id: string;
  day: number;
  time: string;
  title: string;
  platform: string;
  icon: string;
  borderColor: "secondary" | "primary" | "error";
};

export type CalendarDay = {
  day: number;
  isToday?: boolean;
  posts?: ScheduledPost[];
  empty?: boolean;
};

export const WEEK_LABEL = "October 21 – 27, 2024";
export const WEEK_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const CALENDAR_DAYS: CalendarDay[] = [
  {
    day: 21,
    posts: [
      {
        id: "1",
        day: 21,
        time: "10:00 AM",
        title: "AI Future Insights",
        platform: "TikTok",
        icon: "video_library",
        borderColor: "secondary",
      },
    ],
  },
  {
    day: 22,
    isToday: true,
    posts: [
      {
        id: "2",
        day: 22,
        time: "02:30 PM",
        title: "Workstation Setup",
        platform: "Instagram",
        icon: "camera",
        borderColor: "primary",
      },
      {
        id: "3",
        day: 22,
        time: "06:00 PM",
        title: "Devlog #12",
        platform: "YouTube",
        icon: "smart_display",
        borderColor: "error",
      },
    ],
  },
  { day: 23, empty: true },
  {
    day: 24,
    posts: [
      {
        id: "4",
        day: 24,
        time: "09:00 AM",
        title: "Morning Routine AI",
        platform: "TikTok",
        icon: "video_library",
        borderColor: "secondary",
      },
    ],
  },
  { day: 25 },
  { day: 26 },
  { day: 27 },
];

export const PERFORMANCE_STATS = [
  {
    label: "Weekly Views",
    value: "1.2M",
    change: "+24%",
    color: "secondary" as const,
    bars: [30, 50, 45, 80, 100],
  },
  {
    label: "Engagement Rate",
    value: "8.4%",
    change: "+1.2%",
    color: "primary" as const,
    bars: [40, 35, 70, 60, 85],
  },
];

export const ACTIVE_DRAFT = {
  thumbnail:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCB7jY3lGX77FikOSNc8OvUXqe5DdvURg14VjQvm31gwoVQBwDvLkSuuAUXWtJIJOfrhLjksd3Inel7oO5fy7VZOW-OzPSjpOoEeOeQO6LC4NjMfh1NVjwWegbozvHCRszKAbNLAgui6eqQmVqcgdr2xTs0wXiMC-hCLMjvPCshn4pCy1rrs7-4eHeVowwLnV7Kr8lu8zEgAERftIWdTQ5i45LSvD-zOPr3YmtG2Jda61AueLSuPaTRFw",
  scheduled: "Scheduled for Oct 22, 2:30 PM",
  title: '"5 Secrets of AI Design Workflows"',
  caption:
    "Stop wasting hours on manual keyframing! 🕒 See how ASAP AI's new 'Dynamic Speed' feature transforms raw footage into cinematic reels in seconds. 🚀 Perfect for creators who value speed and style. #AIEditing #ContentCreator #ASAPspeed",
  hashtags: ["#AIEditing", "#ContentCreator", "#DigitalNomad"],
};

export const LIVE_TRENDS = [
  {
    icon: "trending_up",
    color: "text-secondary",
    title: "#SynthwaveVibes",
    subtitle: "420K videos / hour",
  },
  {
    icon: "music_note",
    color: "text-tertiary",
    title: "Midnight Pulse (Original Audio)",
    subtitle: "Rising in Tech-Tok",
  },
  {
    icon: "analytics",
    color: "text-primary",
    title: "#AIFuture",
    subtitle: "2.1M views total today",
  },
];
