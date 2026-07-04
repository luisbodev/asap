"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/layout/MaterialIcon";
import {
  ACTIVE_DRAFT,
  CALENDAR_DAYS,
  LIVE_TRENDS,
  PERFORMANCE_STATS,
  WEEK_DAYS,
  WEEK_LABEL,
} from "@/lib/mocks/scheduler.mock";
import type { CalendarDay, ScheduledPost } from "@/lib/mocks/scheduler.mock";
import { cn } from "@/lib/utils";

const BORDER_MAP = {
  secondary: "border-l-secondary",
  primary: "border-l-primary-container",
  error: "border-l-error",
};

const ICON_COLOR = {
  secondary: "text-secondary",
  primary: "text-primary-container",
  error: "text-error",
};

function PostCard({ post }: { post: ScheduledPost }) {
  return (
    <div
      className={cn(
        "glass-card p-xs rounded-lg border-l-4",
        BORDER_MAP[post.borderColor],
        post.borderColor === "primary" && "ring-2 ring-primary/20"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <MaterialIcon
          name={post.icon}
          className={cn("text-sm", ICON_COLOR[post.borderColor])}
        />
        <span className="text-[9px] text-on-surface-variant">{post.time}</span>
      </div>
      <p className="text-[10px] font-bold truncate">{post.title}</p>
      <p className="text-[8px] opacity-60">{post.platform}</p>
    </div>
  );
}

function DayColumn({ day }: { day: CalendarDay }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-base rounded-lg p-base border",
        day.isToday
          ? "bg-surface-container border-primary/20 relative overflow-hidden"
          : "bg-surface-container-lowest/50 border-white/5"
      )}
    >
      {day.isToday && (
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-primary/20" />
      )}
      <span
        className={cn(
          "text-xs font-bold py-1 relative z-10",
          day.isToday && "text-primary"
        )}
      >
        {day.day}
      </span>

      {day.posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {day.empty && (
        <div className="flex flex-col items-center justify-center flex-1 opacity-20 border-2 border-dashed border-white/10 rounded-lg py-4 relative z-10">
          <MaterialIcon name="add" />
        </div>
      )}
    </div>
  );
}

function SuccessToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 2000);
    const hideTimer = setTimeout(() => setVisible(false), 7000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-gutter right-gutter glass-card p-md rounded-xl border-l-4 border-l-secondary flex items-center gap-md z-50 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
        <MaterialIcon name="check_circle" />
      </div>
      <div>
        <p className="font-bold text-sm">Post Scheduled!</p>
        <p className="text-xs text-on-surface-variant">
          Syncing with TikTok and YouTube.
        </p>
      </div>
    </div>
  );
}

export function SchedulerPage() {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <>
      <header className="h-16 flex items-center justify-between px-xl border-b border-white/5 shrink-0 bg-background/50 backdrop-blur-md z-30">
        <div className="flex items-center gap-md">
          <h2 className="font-headline-md text-headline-md tracking-tight">
            Social Planner
          </h2>
          <div className="flex items-center gap-xs px-sm py-1 bg-surface-container-highest rounded-full">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-label-sm text-secondary tracking-widest uppercase">
              Syncing Live
            </span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative group">
            <MaterialIcon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm group-focus-within:text-primary transition-colors"
            />
            <input
              className="bg-surface-container-lowest border border-white/10 rounded-full pl-10 pr-md py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64 transition-all"
              placeholder="Search scheduled posts..."
              type="text"
            />
          </div>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">
            notifications
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 p-gutter overflow-y-auto custom-scrollbar flex flex-col gap-md border-r border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-base bg-surface-container rounded-lg p-1">
              <button
                onClick={() => setView("week")}
                className={cn(
                  "px-md py-1.5 rounded-md font-label-sm text-xs transition-all",
                  view === "week"
                    ? "bg-surface-container-high text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={cn(
                  "px-md py-1.5 rounded-md font-label-sm text-xs transition-all",
                  view === "month"
                    ? "bg-surface-container-high text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                Month
              </button>
            </div>
            <div className="flex items-center gap-sm">
              <button className="material-symbols-outlined p-2 hover:bg-white/5 rounded-full text-on-surface-variant">
                chevron_left
              </button>
              <span className="font-headline-md text-sm">{WEEK_LABEL}</span>
              <button className="material-symbols-outlined p-2 hover:bg-white/5 rounded-full text-on-surface-variant">
                chevron_right
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-base text-center text-on-surface-variant font-label-sm text-[10px] mb-base">
            {WEEK_DAYS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 grid-rows-1 gap-base min-h-[200px]">
            {CALENDAR_DAYS.map((day) => (
              <DayColumn key={day.day} day={day} />
            ))}
          </div>

          <div className="mt-md">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-sm uppercase tracking-widest">
              Global Performance Overview
            </h3>
            <div className="grid grid-cols-3 gap-md">
              {PERFORMANCE_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-md rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase">
                      {stat.label}
                    </p>
                    <p className="font-headline-md text-lg">{stat.value}</p>
                    <p
                      className={cn(
                        "text-[10px] flex items-center gap-1",
                        stat.color === "secondary" ? "text-secondary" : "text-primary"
                      )}
                    >
                      <MaterialIcon name="trending_up" className="text-sm" />
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-16 h-12 flex items-end gap-[2px]">
                    {stat.bars.map((h, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 rounded-t-sm",
                          stat.color === "secondary"
                            ? `bg-secondary/${[20, 40, 60, 100, 90][i]}`
                            : `bg-primary/${[20, 40, 60, 100, 90][i]}`
                        )}
                        style={{
                          height: `${h}%`,
                          backgroundColor:
                            stat.color === "secondary"
                              ? `rgba(76, 215, 246, ${[0.2, 0.4, 0.6, 1, 0.9][i]})`
                              : `rgba(208, 188, 255, ${[0.2, 0.4, 0.6, 1, 0.85][i]})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="glass-card p-md rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase">
                    Viral Probability
                  </p>
                  <p className="font-headline-md text-lg">High</p>
                  <div className="w-24 h-1.5 bg-surface-container-high rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-[78%]" />
                  </div>
                </div>
                <MaterialIcon
                  name="auto_awesome"
                  filled
                  className="text-primary text-3xl opacity-50"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-[400px] bg-surface-container-low p-gutter overflow-y-auto custom-scrollbar flex flex-col gap-lg shrink-0">
          <div className="space-y-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Active Draft Preview
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-bold uppercase">
                Optimizing
              </span>
            </div>
            <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 ring-1 ring-white/5">
              <Image
                src={ACTIVE_DRAFT.thumbnail}
                alt="Active draft preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-md">
                <div className="flex items-center gap-xs mb-base">
                  <MaterialIcon name="schedule" className="text-white text-sm" />
                  <p className="text-xs text-white">{ACTIVE_DRAFT.scheduled}</p>
                </div>
                <p className="text-sm font-bold text-white">{ACTIVE_DRAFT.title}</p>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <MaterialIcon name="play_circle" className="text-white text-5xl" />
              </div>
            </div>
          </div>

          <div className="space-y-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-xs">
                <MaterialIcon name="auto_fix_high" className="text-primary text-sm" />
                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                  AI Caption Studio
                </h3>
              </div>
              <button className="text-[10px] text-primary hover:underline transition-all">
                Regenerate
              </button>
            </div>
            <div className="glass-card p-md rounded-2xl border border-primary/20 relative">
              <div className="ai-shimmer absolute top-0 left-0 w-full h-[2px]" />
              <p className="text-xs leading-relaxed italic text-on-surface mb-md">
                &ldquo;{ACTIVE_DRAFT.caption}&rdquo;
              </p>
              <div className="flex flex-wrap gap-xs">
                {ACTIVE_DRAFT.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-surface-container rounded text-[10px] font-label-sm text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] font-label-sm">
                  +2 trending
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-sm">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              Live Market Trends
            </h3>
            <div className="space-y-xs">
              {LIVE_TRENDS.map((trend) => (
                <div
                  key={trend.title}
                  className="glass-card px-md py-3 rounded-xl flex items-center gap-sm"
                >
                  <MaterialIcon name={trend.icon} className={trend.color} />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{trend.title}</p>
                    <p className="text-[10px] text-on-surface-variant">
                      {trend.subtitle}
                    </p>
                  </div>
                  <button className="material-symbols-outlined text-on-surface-variant hover:text-primary">
                    add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-sm">
            <button className="py-3 border border-white/10 rounded-xl font-label-sm text-xs hover:bg-white/5 transition-all active:scale-95">
              Save Draft
            </button>
            <button className="py-3 bg-primary text-on-primary font-bold rounded-xl text-xs shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Publish Now
            </button>
          </div>
        </section>
      </div>

      <SuccessToast />
    </>
  );
}
