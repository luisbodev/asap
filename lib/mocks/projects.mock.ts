export type ProjectStatus = "processing" | "ready" | "draft" | "exporting";

export type Project = {
  id: string;
  title: string;
  thumbnail: string;
  modified: string;
  resolution: string;
  duration: string;
  status: ProjectStatus;
  progress?: number;
  statusLabel?: string;
  progressLabel?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "cyberpunk-intro",
    title: "Cyberpunk Cinematic Intro",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsUC834jHBgIkwCYryKL8dBPSSv4oCeogqcnSaP6ioIieHrPBe2u4neYc_J6YjUjnBHs3PXaRE3vFJOyuXURqoALNGEmuIpYsr5nF4TsFY7tbVxy2ZzBpm8SQMcrazzhd2TNC4TC9HWNgBS7gGrbAXNnpFQCxAHWEqN9ipSMZmuzhE6F8NdnqC3iNXVQEy0OI7TkHhWOrPkHHBlCKBQ8zfnwvtD2xiEOC8-paFEc07gl9qsA-JV5XC9w",
    modified: "Modified 2m ago",
    resolution: "4K",
    duration: "15s",
    status: "processing",
    progress: 65,
    statusLabel: "Refining Edges",
    progressLabel: "65%",
  },
  {
    id: "nature-reverb",
    title: "Nature Reverb Campaign",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNdfv1zk2i2gEL1IdrZO3NyC7Ld3KMOcRk_M2FLWRr1ms584wlHShzt15uKmsJnJAHiityNLwPPlY_DFGWVge2EcrB1GKvEKITD4cwM1mbGaEQnh5SwbwXXau_3RLKPBSTl8CQXwTsvhz8m71bZnjUmAFM9nOSfwKOPQVuhsUBmgVV1MDVq9NNGw84mpy6KGhjfF4lbjZHy0snr9ERnzhynKL7T7vcqCcZrAloZMGTj_6CFJToTm9SCg",
    modified: "Modified 1h ago",
    resolution: "1080p",
    duration: "45s",
    status: "ready",
  },
  {
    id: "tech-showcase",
    title: "Tech Showcase V3",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBypRFusaJ2k1GmAKqzUXV8rSJtigT7ehQakXSdLOrMGmOaN6AFjMBYaqx5NBkfiHpeZgkWrWVFgRR-ZIUuL3N2EwokSLYB7QD2WHgZ0LPX96vBzs1ts4i_P2LyzjkUX4wKpe_w31yKjIG47pOu3LlEqvcF9c0ky7I0yy8BUSBs23nOJWfkRBBRgk60fjxe0dPZqx0mnBOIUV1eTtmue6fO_KP9y5NO7OD8zjYnm6hVHajRySuBk2CCLQ",
    modified: "Modified 4h ago",
    resolution: "4K",
    duration: "--",
    status: "draft",
  },
  {
    id: "abstract-motion",
    title: "Abstract Motion Study",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5DHELVyTt7scDaa48CKulZfmZUmI3GoR0yN028THn5jKPJP1noRDjXBl18mfGHJFVrF0YuNVu2N7am3WiRxN8Efw5s6RF7ZCazHBA9Q2NFi3IVRuv6V710M_JZ1OZ-mWvyk4Hr8az0gEk0x_S8wmrS_WSur13RIzfkYmH8J3iWXXOimYaMibrOeYeBAECnnTjgM_6zmIp6QwPhtv_3krVZ85wKOy__iWcN1nta-dZ5HXdOymXV3wJvA",
    modified: "Modified 12m ago",
    resolution: "8K",
    duration: "60s",
    status: "exporting",
    progress: 92,
    statusLabel: "Finalizing...",
  },
];

export const SCHEDULER_QUICK_VIEW = [
  { day: "12", title: "Nature Campaign", time: "Tomorrow, 10:00 AM", active: true },
  { day: "14", title: "Tech Showcase", time: "Wed, 2:00 PM", active: false },
];

export const PERFORMANCE_BARS = [40, 65, 50, 85, 70, 95, 60];
