"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { projectServiceLabels } from "@/lib/project-service";
import type { ProjectService } from "@/models/project";

type ProjectCard = {
  id: string;
  projectCode: number;
  title: string;
  slug: string;
  service: ProjectService;
  coverImageUrl: string;
  excerpt: string;
  locationLabel?: string;
};

async function fetchProjects(service: ProjectService) {
  const response = await fetch(`/api/projects?service=${service}&limit=6`);
  if (!response.ok) throw new Error("Could not load projects");
  const data = (await response.json()) as { projects?: ProjectCard[] };
  return data.projects || [];
}

export default function RelatedProjectsSection({ service }: { service: ProjectService }) {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    fetchProjects(service).then(
      (items) => {
        if (!active) return;
        setProjects(items);
        setState("ready");
      },
      () => {
        if (active) setState("error");
      },
    );
    return () => { active = false; };
  }, [service]);

  const retry = () => {
    setState("loading");
    fetchProjects(service).then(
      (items) => {
        setProjects(items);
        setState("ready");
      },
      () => setState("error"),
    );
  };

  if (state === "ready" && projects.length === 0) return null;

  return (
    <section aria-labelledby={`related-projects-${service}`} className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex items-end justify-between gap-8 border-b border-[var(--brand-navy)]/15 pb-7">
          <div>
            <p className="font-brand-sans text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--brand-gold-dark,var(--brand-gold))]">Related projects · {projectServiceLabels[service]}</p>
            <h2 id={`related-projects-${service}`} className="mt-3 max-w-[720px] font-brand-display text-[38px] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand-navy)] sm:text-[52px]">Made for spaces like yours.</h2>
          </div>
          <Link href="/projects" className="group hidden items-center gap-2 font-brand-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand-navy)] underline decoration-[var(--brand-gold)] decoration-2 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-navy)] sm:inline-flex">
            View all projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {state === "loading" && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading related projects" aria-busy="true">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-[26px] border border-[var(--brand-navy)]/10 bg-white/45">
                <div className="aspect-[4/3] animate-pulse bg-[var(--brand-navy)]/10 motion-reduce:animate-none" />
                <div className="space-y-3 p-6"><div className="h-3 w-24 animate-pulse rounded bg-[var(--brand-navy)]/10 motion-reduce:animate-none" /><div className="h-7 w-3/4 animate-pulse rounded bg-[var(--brand-navy)]/10 motion-reduce:animate-none" /></div>
              </div>
            ))}
          </div>
        )}

        {state === "error" && (
          <div className="mt-8 flex items-center justify-between gap-6 border-l-2 border-[var(--brand-gold)] bg-white/45 px-5 py-4">
            <p className="font-brand-sans text-sm font-medium text-[var(--brand-navy)]/75">Our project collection could not be loaded right now.</p>
            <button type="button" onClick={retry} className="shrink-0 font-brand-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand-navy)] underline decoration-[var(--brand-gold)] decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Try again</button>
          </div>
        )}

        {state === "ready" && projects.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group relative isolate overflow-hidden rounded-[26px] bg-[var(--brand-navy)] shadow-[0_18px_45px_rgba(18,31,48,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={project.coverImageUrl} alt={`${project.title} project`} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transition-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/15 to-transparent" />
                  <span className="absolute left-5 top-5 border border-[var(--brand-gold)]/70 bg-[var(--brand-navy)]/90 px-3 py-2 font-brand-sans text-[10px] font-extrabold tracking-[0.18em] text-[var(--brand-gold)]">№ {project.projectCode}</span>
                </div>
                <div className="relative -mt-20 p-6 pt-0 text-white">
                  <p className="font-brand-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold)]">{projectServiceLabels[project.service]}</p>
                  <h3 className="mt-2 font-brand-display text-[29px] font-medium leading-[1.05] tracking-[-0.025em]">{project.title}</h3>
                  <p className="mt-3 line-clamp-2 font-brand-sans text-[12px] font-medium leading-[1.7] text-white/70">{project.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                    {project.locationLabel ? <span className="flex min-w-0 items-center gap-1.5 truncate font-brand-sans text-[10px] font-bold uppercase tracking-[0.1em] text-white/60"><MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--brand-gold)]" aria-hidden="true" />{project.locationLabel}</span> : <span />}
                    <span className="flex shrink-0 items-center gap-2 font-brand-sans text-[10px] font-extrabold uppercase tracking-[0.13em] text-white">View project <ArrowRight className="h-4 w-4 text-[var(--brand-gold)] transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href="/projects" className="mt-7 inline-flex items-center gap-2 font-brand-sans text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand-navy)] underline decoration-[var(--brand-gold)] decoration-2 underline-offset-8 sm:hidden">View all projects <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
