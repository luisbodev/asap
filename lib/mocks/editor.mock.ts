export type AIClip = {
  id: string;
  thumbnail: string;
  duration: string;
  score?: number;
  title: string;
  recommendation: string;
  generating?: boolean;
};

export const EDITOR_PROJECT = {
  filename: "Summer_Vlog_01.mp4",
  status: "EDITING",
  preview:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBuFjY8Lu5Xn5knV9RSBEqOJozB-MlWn9RtXNCFlHSzrvp64XfVtDHig7HvUJdPnkJ_NfbDEyHx7a-qtsQlDO6lkQBSH7S9gKZcdeRHih4eNFRkU5dHzTkU45m-p88vmlRALqxPwxyxS-Kj8kKVSwD47-7NLK9i1qxfIoqfYBYN5jMZ9_EveZLUsOSQ_L76NhqCyVEwb_Gab60AnNVgFS-EKwVmTkgoydZ2sHNxaEDkXJMIEoBK-CTrHg",
  currentTime: "00:12:45",
  totalTime: "00:30:00",
};

export const AI_CLIPS: AIClip[] = [
  {
    id: "1",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsBXDMauM-krp7zKb_wTDH9cSFz-D8nHLICF1ZbdsXDH_6ZiS0v7Hc7hGOqqfTozMmNOgZI86PS8IG6z9-QKPA6ul-9AqzOmHBIne9tGgJU7j6wh7dphQewhg1ipjcCd17zmqvLf6nS5LAfiSF4M2gSoXZAah6rZrRWr9sccCnOk5xlA7g0FcUUJBnVa8V6AEFKJU7Ut_CSpHZIxLTzc1U97quiLiclKup__IU1yYqHnNOVKz5B2oyYA",
    duration: "0:15",
    score: 98,
    title: "The Perfect Transition",
    recommendation: "Recommended: TikTok/Reels",
  },
  {
    id: "2",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsQKM17CUkb6mlk4U7aKcAj5opb5QoPyKKs0T8l1Gymyhjzbb_tNygHCibLiaMWq6yqNT0TjSIn4lNA_eAF8zddKFHM1qO34L5-efXzHQWkKzWbnGJXnE969_oSsLWBsoIJ7tb654y5OkB_bVvbm1KLKb-YF_8Ti_kGay9sEYQhSdG_yZZC87RweUXA6EDf7Lm1XgUzHOW0WUYcViZ6zZXl2Ymxa8u59_Hca7h3amGv3rkW19FZbp5Wg",
    duration: "0:24",
    score: 92,
    title: "Cinematic City Night",
    recommendation: "Recommended: YouTube Shorts",
  },
  {
    id: "3",
    thumbnail: "",
    duration: "",
    title: "Highlight Segment #3",
    recommendation: "Analyzing virality potential...",
    generating: true,
  },
];
