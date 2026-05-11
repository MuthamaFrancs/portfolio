"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data/site";
import { ExternalLink } from "@/components/ui/external-link";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

export function ProjectsAchievementsSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotionSafe();
  const mounted = useHasMounted();
  const total = projects.length;
  const active = projects[index];

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + total) % total);
  };

  const slideMotion = mounted && !reduceMotion;

  return (
    <section
      id="projects"
      className="relative scroll-mt-28 border-t border-black/5 py-24 dark:border-white/10 md:py-32"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-label text-brand">
            EXPLORE
          </p>
          <h2
            id="projects-heading"
            className="mt-3 font-display text-4xl font-light tracking-display text-ink dark:text-white md:text-5xl md:font-normal"
          >
            Projects <span className="italic text-accent">&</span> achievements
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-zinc-400">
            Take a look at some apps and systems I have built : 
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="glass-card relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={slideMotion ? { opacity: 0, x: 24 } : false}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={
                  slideMotion
                    ? { opacity: 0, x: -24, filter: "blur(4px)" }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={active.image}
                  alt={`Preview for ${active.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={index === 0}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {active.badge && (
                  <p className="absolute bottom-4 left-4 max-w-[85%] rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-medium uppercase tracking-label text-ink shadow-sm backdrop-blur dark:bg-zinc-950/90 dark:text-white">
                    {active.badge}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug + "-copy"}
                initial={slideMotion ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={slideMotion ? { opacity: 0, y: -8 } : { opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="glass-card rounded-3xl p-8"
              >
                <p className="text-[11px] font-medium uppercase tracking-label text-brand">
                  {active.tagline}
                </p>
                <h3 className="mt-2 font-display text-3xl font-normal tracking-display text-ink dark:text-white">
                  {active.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-muted dark:text-zinc-400">
                  {active.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {active.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-ink dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  {active.links.map((link) => (
                    <ExternalLink
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-muted"
                    >
                      {link.label}
                      <span aria-hidden>↗</span>
                    </ExternalLink>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2" role="tablist" aria-label="Project slides">
                {projects.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls={`project-panel-${p.slug}`}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index
                        ? "w-10 bg-accent"
                        : "w-2.5 bg-zinc-300 dark:bg-zinc-600"
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-lg transition hover:border-accent/40"
                  aria-label="Previous project"
                  onClick={() => go(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="glass-panel inline-flex h-11 w-11 items-center justify-center rounded-full text-lg transition hover:border-accent/40"
                  aria-label="Next project"
                  onClick={() => go(1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
