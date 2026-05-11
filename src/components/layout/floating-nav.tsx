"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { navItems } from "@/lib/data/site";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <span
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/40 dark:border-white/10 dark:bg-zinc-900/50"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/50 text-sm font-medium text-ink shadow-sm backdrop-blur-md transition hover:border-accent/40 hover:bg-white/80 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800/80"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}

export function FloatingNav() {
  const sectionIds = navItems.map((n) => n.id);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <div className="pointer-events-auto w-full max-w-5xl">
        <nav
          className="glass-panel flex items-center justify-between gap-3 rounded-full px-3 py-2 pl-5 shadow-glass-lg md:px-4 md:py-2.5"
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("home");
              setOpen(false);
            }}
            className="font-display text-lg tracking-tight text-ink dark:text-white"
          >
            FM<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    className={`relative rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-label transition ${
                      isActive
                        ? "text-brand"
                        : "text-ink-muted hover:text-brand dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {isActive && mounted && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand/15 dark:bg-brand/25"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    {isActive && !mounted && (
                      <span className="absolute inset-0 -z-10 rounded-full bg-brand/15 dark:bg-brand/25" />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/50 text-lg backdrop-blur-md transition hover:bg-white/80 dark:border-white/10 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "×" : "≡"}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-panel mt-3 rounded-3xl p-4 shadow-glass-lg md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-ink hover:bg-white/60 dark:text-zinc-100 dark:hover:bg-zinc-800/60"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(item.id);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
