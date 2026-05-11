"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { techIconSrc, techStack } from "@/lib/data/site";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

function MarqueeRow({ reverse }: { reverse?: boolean }) {
  const reduceMotion = useReducedMotionSafe();
  const mounted = useHasMounted();
  const row = [...techStack, ...techStack];
  const runMarquee = mounted && !reduceMotion;

  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex w-max gap-6 pr-6 md:gap-8 md:pr-8"
        initial={false}
        animate={
          runMarquee
            ? { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
            : { x: 0 }
        }
        transition={
          runMarquee
            ? { repeat: Infinity, ease: "linear", duration: 42 }
            : { duration: 0 }
        }
      >
        {row.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            role="img"
            aria-label={tech.name}
            title={tech.name}
            className="glass-panel flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-glass md:h-16 md:w-16"
            initial={false}
            whileHover={
              reduceMotion ? undefined : { y: -3, scale: 1.04 }
            }
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
          >
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 dark:bg-zinc-900/80 md:h-11 md:w-11"
              style={{ boxShadow: `0 0 0 1px ${tech.accent}22` }}
            >
              <Image
                src={techIconSrc(tech.slug)}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain md:h-9 md:w-9"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechArsenalSection() {
  return (
    <section
      id="tech"
      className="scroll-mt-28 border-t border-black/5 bg-white/40 py-24 dark:border-white/10 dark:bg-zinc-950/40 md:py-32"
      aria-labelledby="tech-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-label text-brand">
            Tech arsenal
          </p>
          <h2
            id="tech-heading"
            className="mt-3 font-display text-4xl font-light tracking-display text-ink dark:text-white md:text-5xl md:font-normal"
          >
            Tools to <span className="text-accent">ship</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted dark:text-zinc-400">
            These are the tech tools and programming languages I use to ship .
          </p>
        </header>

        <div className="glass-card overflow-hidden rounded-3xl border border-white/60 bg-white/40 py-2 dark:border-white/10 dark:bg-zinc-900/30">
          <MarqueeRow />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
          <MarqueeRow reverse />
        </div>
      </div>
    </section>
  );
}
