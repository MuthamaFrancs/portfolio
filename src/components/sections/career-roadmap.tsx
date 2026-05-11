"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import {
  certifications,
  education,
  experience,
} from "@/lib/data/site";
import { ExternalLink } from "@/components/ui/external-link";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

export function CareerRoadmapSection() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section
      id="career"
      className="scroll-mt-28 border-t border-black/5 py-24 dark:border-white/10 md:py-32"
      aria-labelledby="career-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-14 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-label text-brand">
            Career roadmap
          </p>
          <h2
            id="career-heading"
            className="mt-3 font-display text-4xl font-light tracking-display text-ink dark:text-white md:text-5xl md:font-normal"
          >
            Learning, then <span className="italic text-accent">leading</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-zinc-400">
            I&apos;m well-grounded educationally. At the intersection of preparation and
            opportunity, I practically applied those foundations into work with measurable
            outcomes.
          </p>
        </header>

        <motion.div
          variants={reduceMotion ? undefined : staggerContainer}
          initial={false}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-12 lg:grid-cols-2"
        >
          <motion.div
            variants={reduceMotion ? undefined : fadeIn}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            <h3 className="font-display text-2xl font-medium tracking-display text-ink dark:text-white">
              Education
            </h3>
            <ol className="relative mt-8 space-y-10 border-l border-brand/25 pl-8 dark:border-brand/40">
              {education.map((item) => (
                <li key={item.institution} className="relative">
                  <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border border-white bg-accent shadow dark:border-zinc-900" />
                  <p className="text-[11px] font-medium uppercase tracking-label text-brand">
                    {item.period}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-ink dark:text-white">
                    <ExternalLink
                      href={item.href}
                      className="underline decoration-brand/30 underline-offset-4 transition hover:decoration-brand"
                    >
                      {item.institution}
                    </ExternalLink>
                  </h4>
                  <p className="mt-1 text-sm font-medium text-ink-muted dark:text-zinc-400">
                    {item.credential}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-zinc-400">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12 border-t border-black/5 pt-10 dark:border-white/10">
              <h3 className="font-display text-2xl font-medium tracking-display text-ink dark:text-white">
                Certifications
              </h3>
              <ul className="mt-6 space-y-6">
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="rounded-2xl border border-black/5 bg-white/60 p-5 dark:border-white/10 dark:bg-zinc-900/50"
                  >
                    <p className="text-base font-semibold text-ink dark:text-white">
                      {c.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted dark:text-zinc-400">
                      <ExternalLink
                        href={c.issuerHref}
                        className="font-medium text-brand hover:underline"
                      >
                        {c.issuer}
                      </ExternalLink>
                      {c.period ? ` · ${c.period}` : ""}
                    </p>
                    {c.skills ? (
                      <p className="mt-2 text-xs uppercase tracking-wide text-ink-muted dark:text-zinc-500">
                        {c.skills}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : fadeIn}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            <h3 className="font-display text-2xl font-medium tracking-display text-ink dark:text-white">
              Work experience
            </h3>
            <ul className="mt-8 space-y-10">
              {experience.map((job) => (
                <li key={job.role + job.company}>
                  <p className="text-[11px] font-medium uppercase tracking-label text-brand">
                    {job.period}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-ink dark:text-white">
                    {job.role}{" "}
                    <span className="text-ink-muted dark:text-zinc-400">
                      @{" "}
                      <ExternalLink
                        href={job.companyHref}
                        className="text-brand hover:underline"
                      >
                        {job.company}
                      </ExternalLink>
                    </span>
                  </h4>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted marker:text-brand dark:text-zinc-400">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
