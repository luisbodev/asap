"use client";

import Image from "next/image";
import { useState } from "react";
import { AppFooter } from "@/components/layout/AppFooter";
import { MaterialIcon } from "@/components/layout/MaterialIcon";
import {
  AUTO_REPLY_TRIGGERS,
  COMMENT_STATS,
  ENGAGEMENT_BARS,
  PENDING_COMMENTS,
} from "@/lib/mocks/comments.mock";
import type { AutoReplyTrigger } from "@/lib/mocks/comments.mock";
import { USER_AVATAR } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

const TRIGGER_BORDER = {
  secondary: "border-l-secondary",
  primary: "border-l-primary",
  tertiary: "border-l-tertiary",
};

const TRIGGER_BADGE = {
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  primary: "bg-primary/10 text-primary border-primary/20",
  tertiary: "bg-tertiary/10 text-tertiary border-tertiary/20",
};

const TOGGLE_COLOR = {
  secondary: "peer-checked:bg-secondary",
  primary: "peer-checked:bg-primary",
  tertiary: "peer-checked:bg-tertiary",
};

function TriggerCard({ trigger }: { trigger: AutoReplyTrigger }) {
  const [enabled, setEnabled] = useState(trigger.enabled);

  return (
    <div
      className={cn(
        "glass-card p-md rounded-xl inner-glow border-l-4 relative overflow-hidden group",
        TRIGGER_BORDER[trigger.borderColor]
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-md relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span
              className={cn(
                "font-label-sm text-label-sm px-2 py-0.5 rounded border",
                TRIGGER_BADGE[trigger.borderColor]
              )}
            >
              Trigger: &ldquo;{trigger.name}&rdquo;
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {trigger.lastFired}
            </span>
          </div>
          <h4 className="font-body-lg font-semibold text-on-background mb-1">
            {trigger.condition}
          </h4>
          <p className="font-body-md text-on-surface-variant italic">
            &ldquo;{trigger.reply}&rdquo;
          </p>
        </div>
        <div className="flex items-center gap-base">
          <button className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-primary transition-all">
            <MaterialIcon name="edit" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5 text-on-surface-variant hover:text-error transition-all">
            <MaterialIcon name="delete" />
          </button>
          <div className="ml-2 h-10 w-px bg-white/10" />
          <label className="relative inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={cn(
                "w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all",
                TOGGLE_COLOR[trigger.borderColor]
              )}
            />
          </label>
        </div>
      </div>
      {trigger.shimmer && (
        <div className="absolute bottom-0 left-0 h-1 ai-shimmer w-full opacity-30" />
      )}
    </div>
  );
}

function PendingCommentCard({
  comment,
}: {
  comment: (typeof PENDING_COMMENTS)[0];
}) {
  const [sent, setSent] = useState(false);
  const isPrimary = comment.accentColor === "primary";

  return (
    <div className="glass-card p-sm rounded-xl inner-glow flex flex-col gap-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10 relative">
          <Image src={comment.avatar} alt={comment.username} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label-sm text-label-sm font-bold text-on-background truncate">
              {comment.username}
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">
              {comment.time}
            </span>
          </div>
          <p className="font-body-md text-[14px] text-on-surface leading-snug">
            &ldquo;{comment.comment}&rdquo;
          </p>
        </div>
      </div>
      <div
        className={cn(
          "bg-surface-container-low p-3 rounded-lg border",
          isPrimary ? "border-primary/20" : "border-secondary/20"
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <MaterialIcon
            name="auto_awesome"
            filled
            className={cn("text-[16px]", isPrimary ? "text-primary" : "text-secondary")}
          />
          <span
            className={cn(
              "font-label-sm text-[11px] uppercase tracking-wider",
              isPrimary ? "text-primary-fixed" : "text-secondary-fixed"
            )}
          >
            Suggested Reply
          </span>
        </div>
        <p className="font-body-md text-[13px] text-on-surface-variant italic mb-3">
          &ldquo;{comment.suggestedReply}&rdquo;
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setSent(true)}
            disabled={sent}
            className={cn(
              "flex-1 py-1.5 rounded font-bold font-label-sm text-[11px] transition-all hover:brightness-110 active:scale-95",
              sent
                ? "bg-secondary text-on-secondary-container"
                : isPrimary
                  ? "bg-primary text-on-primary"
                  : "bg-secondary text-on-secondary"
            )}
          >
            {sent ? "Sent!" : "Send Reply"}
          </button>
          <button className="px-3 py-1.5 rounded border border-white/10 font-label-sm text-[11px] text-on-surface-variant hover:bg-white/5">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export function CommentsManagerPage() {
  return (
    <>
      <header className="flex items-center justify-between px-gutter py-md bg-background/80 backdrop-blur-xl border-b border-white/10 z-40 sticky top-0 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background">
              Comment Manager
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Configure AI automation for community engagement
            </p>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-highest border border-white/10">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary uppercase">
              AI Agent Active
            </span>
          </div>
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
            <MaterialIcon name="notifications" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/50 relative">
            <Image src={USER_AVATAR} alt="Profile" fill className="object-cover" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="max-w-7xl mx-auto space-y-lg p-gutter">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-sm">
            {COMMENT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-sm rounded-xl inner-glow flex flex-col gap-2"
              >
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {stat.label}
                </span>
                <span className={cn("font-headline-md text-headline-md", stat.color)}>
                  {stat.value}
                </span>
                <div className="flex items-center gap-1 text-secondary font-label-sm text-[10px]">
                  <MaterialIcon name={stat.icon} className="text-[14px]" />
                  {stat.meta}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 space-y-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-headline-md text-on-background">
                  Smart Auto-Replies
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high border border-white/10 font-label-sm text-label-sm text-primary-fixed hover:bg-surface-container-highest transition-all">
                  <MaterialIcon name="add_circle" className="text-[18px]" />
                  New Trigger
                </button>
              </div>
              <div className="space-y-sm">
                {AUTO_REPLY_TRIGGERS.map((trigger) => (
                  <TriggerCard key={trigger.id} trigger={trigger} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-sm">
              <h3 className="font-headline-md text-headline-md text-on-background mb-2">
                Pending Reviews
              </h3>
              <div className="space-y-sm">
                {PENDING_COMMENTS.map((comment) => (
                  <PendingCommentCard key={comment.id} comment={comment} />
                ))}
                <button className="w-full py-3 text-center font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                  View 14 more pending
                  <MaterialIcon name="arrow_forward" className="text-[18px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-md overflow-hidden relative">
            <div className="flex items-center justify-between mb-lg">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-background">
                  Automation Engagement
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  How AI replies are performing across channels
                </p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-highest border border-white/10 text-[10px] font-bold text-on-surface-variant uppercase">
                  7 Days
                </span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-on-surface-variant uppercase">
                  30 Days
                </span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {ENGAGEMENT_BARS.map((height, i) => {
                const colors = [
                  "bg-primary/20",
                  "bg-secondary/20",
                  "bg-primary/20",
                  "bg-tertiary/20",
                  "bg-secondary/20",
                  "bg-primary/20",
                  "bg-secondary/20",
                ];
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t-lg relative group transition-all hover:opacity-80",
                      colors[i]
                    )}
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between px-4 mt-4 text-[10px] text-on-surface-variant font-label-sm uppercase tracking-widest">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}
