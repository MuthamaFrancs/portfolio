"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/lib/data/site";
import { ExternalLink } from "@/components/ui/external-link";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

export function HeroSection() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[length:48px_48px] bg-grid-fade opacity-70 dark:opacity-40"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-brand/15 via-accent/[0.06] to-transparent dark:from-brand/30 dark:via-accent/10" />

      <motion.div
        variants={reduceMotion ? undefined : staggerContainer}
        initial={false}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center"
      >
        <motion.div
          variants={reduceMotion ? undefined : fadeIn}
          className="max-w-2xl flex-1"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-label text-brand">
            Introduction
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-light leading-[1.05] tracking-display text-ink dark:text-white sm:text-5xl md:text-6xl md:font-normal"
          >
            {profile.shortName.split(" ")[0]}{" "}
            <span className="font-medium text-accent md:font-semibold">
              {profile.shortName.split(" ").slice(1).join(" ")}
            </span>
            <span className="text-ink-muted dark:text-zinc-500">.</span>
          </h1>
          <p className="mt-2 text-xs font-medium uppercase tracking-label text-ink-muted dark:text-zinc-400">
            {profile.title}
          </p>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted dark:text-zinc-300">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-muted/90 dark:text-zinc-400">
            {profile.bio}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent transition hover:bg-accent-muted active:scale-[0.98]"
            >
              View projects
            </a>
            <ExternalLink
              href={profile.cvUrl}
              className="inline-flex items-center justify-center rounded-full border border-brand/25 bg-white/70 px-7 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur-md transition hover:border-accent/50 hover:bg-white dark:border-white/15 dark:bg-zinc-900/60 dark:text-white dark:hover:bg-zinc-800/80"
            >
              Professional CV
            </ExternalLink>
            <a
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("connect")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-ink-muted underline-offset-4 transition hover:text-accent hover:underline dark:text-zinc-300"
            >
              Let&apos;s connect
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeIn}
          className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md"
        >
          <div className="glass-card relative aspect-[4/5] overflow-hidden rounded-[2rem] p-3 shadow-glass-lg">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-brand/25 via-accent/10 to-transparent">
              <Image
                src={profile.profileImage}
                alt={`Portrait of ${profile.fullName}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-28 w-28 rounded-full bg-accent/30 blur-2xl md:block" />
        </motion.div>
      </motion.div>
    </section>
  );
}
