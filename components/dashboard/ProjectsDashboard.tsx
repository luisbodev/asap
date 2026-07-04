"use client";

import Image from "next/image";
import Link from "next/link";
import { AppFooter } from "@/components/layout/AppFooter";
import { MaterialIcon } from "@/components/layout/MaterialIcon";
import {
  PERFORMANCE_BARS,
  PROJECTS,
  SCHEDULER_QUICK_VIEW,
} from "@/lib/mocks/projects.mock";
import type { Project, ProjectStatus } from "@/lib/mocks/projects.mock";
import { cn } from "@/lib/utils";

const BORDER_COLORS: Record<ProjectStatus, string> = {
  processing: "hover:border-primary/40",
  ready: "hover:border-secondary/40",
  draft: "hover:border-on-surface-variant/40",
  exporting: "hover:border-primary/40",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl overflow-hidden group transition-all duration-300 flex flex-col",
        BORDER_COLORS[project.status]
      )}
    >
      <div className="aspect-video relative overflow-hidden bg-surface-container-highest">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-110",
            (project.status === "processing" || project.status === "exporting") &&
              "opacity-60"
          )}
        />

        {project.status === "processing" && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full border-2 border-secondary/30 flex items-center justify-center mb-xs">
                <MaterialIcon name="sync" className="text-secondary animate-spin" />
              </div>
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                AI Processing
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-secondary shimmer"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </>
        )}

        {project.status === "exporting" && (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-12 h-12 rounded-full border-2 border-secondary/30 flex items-center justify-center mb-xs">
                <MaterialIcon name="cloud_download" className="text-secondary animate-pulse" />
              </div>
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                Exporting
              </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 overflow-hidden">
              <div
                className="h-full bg-secondary shimmer"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </>
        )}

        {project.status === "ready" && (
          <>
            <div className="absolute top-xs right-xs">
              <span className="px-xs py-1 rounded-full bg-background/80 backdrop-blur-md border border-secondary/40 text-[10px] font-bold text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Ready to Schedule
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <button className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl">
                <MaterialIcon name="play_arrow" filled className="text-black" />
              </button>
            </div>
          </>
        )}

        {project.status === "draft" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-xs py-1 rounded-full bg-surface-container-highest border border-white/5 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Draft
            </span>
          </div>
        )}
      </div>

      <div className="p-sm flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-base">
          <h4 className="font-body-md text-body-md font-bold text-on-surface truncate pr-xs">
            {project.title}
          </h4>
          <MaterialIcon
            name="more_vert"
            className="text-on-surface-variant/40 cursor-pointer hover:text-on-surface"
          />
        </div>
        <p className="font-label-sm text-[11px] text-on-surface-variant/60 mb-md">
          {project.modified} • {project.resolution} • {project.duration}
        </p>

        {project.status === "ready" && (
          <div className="mt-auto flex gap-2">
            <Link
              href="/editor"
              className="flex-1 py-2 rounded-lg bg-surface-container border border-white/10 text-[12px] font-bold hover:bg-white/5 transition-colors text-center"
            >
              Edit
            </Link>
            <Link
              href="/scheduler"
              className="flex-1 py-2 rounded-lg bg-secondary text-on-secondary-container text-[12px] font-bold hover:bg-secondary/90 transition-colors text-center"
            >
              Schedule
            </Link>
          </div>
        )}

        {project.status === "draft" && (
          <div className="mt-auto">
            <Link
              href="/editor"
              className="block w-full py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] font-bold hover:bg-white/10 transition-colors text-center"
            >
              Continue Editing
            </Link>
          </div>
        )}

        {(project.status === "processing" || project.status === "exporting") && (
          <div className="mt-auto flex items-center gap-xs">
            {project.statusLabel && (
              <div className="px-2 py-1 rounded bg-secondary/10 border border-secondary/20">
                <span className="text-[10px] font-bold text-secondary uppercase">
                  {project.statusLabel}
                </span>
              </div>
            )}
            {project.progressLabel && (
              <div className="px-2 py-1 rounded bg-primary/10 border border-primary/20">
                <span className="text-[10px] font-bold text-primary uppercase">
                  {project.progressLabel}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 px-gutter py-md flex justify-between items-center shrink-0">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-background">
            Dashboard
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant/70">
            Welcome back, Alex. Your AI fleet is active.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="hidden lg:flex items-center gap-xs px-sm py-xs bg-surface-container rounded-full border border-white/10">
            <MaterialIcon name="bolt" className="text-secondary text-sm" />
            <span className="font-label-sm text-label-sm text-secondary">
              820 / 1000 AI Credits
            </span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-white/10 text-on-surface-variant hover:text-on-surface transition-colors">
            <MaterialIcon name="notifications" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-gutter space-y-lg relative z-10">
          <section className="flex flex-col md:flex-row gap-gutter justify-between items-start md:items-center">
            <h3 className="font-headline-md text-headline-md text-on-background flex items-center gap-xs">
              Recent Projects
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[12px] font-bold">
                12
              </span>
            </h3>
            <button className="group flex items-center gap-xs bg-primary text-on-primary font-bold py-md px-xl rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20">
              <MaterialIcon
                name="cloud_upload"
                className="group-hover:rotate-90 transition-transform"
              />
              <span className="font-label-sm text-label-sm">Upload Video</span>
            </button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-md">
            <div className="lg:col-span-2 glass-card rounded-xl p-md">
              <div className="flex justify-between items-center mb-md">
                <h4 className="font-headline-md text-headline-md text-on-background">
                  System Performance
                </h4>
                <MaterialIcon
                  name="open_in_full"
                  className="text-on-surface-variant cursor-pointer"
                />
              </div>
              <div className="h-48 flex items-end gap-xs">
                {PERFORMANCE_BARS.map((height, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t transition-colors",
                      i === 5 ? "bg-primary/60 hover:bg-primary/80" : "bg-primary/20 hover:bg-primary/40"
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-sm flex justify-between text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-md flex flex-col">
              <h4 className="font-headline-md text-headline-md text-on-background mb-md">
                Scheduler Quick-view
              </h4>
              <div className="space-y-sm flex-1">
                {SCHEDULER_QUICK_VIEW.map((item) => (
                  <Link
                    key={item.day}
                    href="/scheduler"
                    className={cn(
                      "flex items-center gap-sm p-xs rounded-lg hover:bg-white/5 cursor-pointer transition-colors",
                      !item.active && "opacity-60"
                    )}
                  >
                    <div className="w-12 h-12 rounded bg-surface-container border border-white/5 flex items-center justify-center font-bold text-primary">
                      {item.day}
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm font-bold">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-on-surface-variant/60">
                        {item.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/scheduler"
                className="mt-md w-full py-2 border border-white/10 rounded-lg font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors text-center block"
              >
                Open Full Scheduler
              </Link>
            </div>
          </section>
        </div>
        <AppFooter />
      </div>

      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center z-50">
        <MaterialIcon name="add" />
      </button>
    </>
  );
}
