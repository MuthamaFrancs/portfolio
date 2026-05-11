"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { sideQuests } from "@/lib/data/site";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

export function SideQuestsSection() {
  const reduceMotion = useReducedMotionSafe();

  return (
    <section
      id="side-quests"
      className="scroll-mt-28 border-t border-black/5 bg-gradient-to-b from-brand/[0.06] via-accent/[0.04] to-transparent py-24 dark:border-white/10 dark:from-brand/20 dark:via-accent/10 md:py-32"
      aria-labelledby="side-quests-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-label text-brand">
            Beyond the ticket queue
          </p>
          <h2
            id="side-quests-heading"
            className="mt-3 font-display text-4xl font-light tracking-display text-ink dark:text-white md:text-5xl md:font-normal"
          >
            Side <span className="italic text-accent">quests</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-zinc-400">
            The work that does not always show up on a résumé line — experiments,
            leadership moments, and creative risks that keep engineering human.
          </p>
        </header>

        <motion.ul
          variants={reduceMotion ? undefined : staggerContainer}
          initial={false}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {sideQuests.map((item) => (
            <motion.li
              key={item.title}
              variants={reduceMotion ? undefined : fadeIn}
              className="glass-card group rounded-3xl p-8 transition hover:border-accent/35"
            >
              <h3 className="font-display text-2xl font-medium tracking-display text-ink transition group-hover:text-accent dark:text-white dark:group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-muted dark:text-zinc-400">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
