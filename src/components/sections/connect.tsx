"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { profile } from "@/lib/data/site";
import { ExternalLink } from "@/components/ui/external-link";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { useReducedMotionSafe } from "@/lib/hooks/use-reduced-motion-safe";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Use a valid email address.";
  }
  if (values.message.trim().length < 12) {
    errors.message = "A few more words help me understand how I can help.";
  }
  return errors;
}

const socialIconLinkClass =
  "glass-panel inline-flex h-12 w-12 items-center justify-center rounded-full text-ink transition hover:border-accent/50 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-zinc-200 dark:hover:text-accent";

const socialLinks = [
  {
    id: "linkedin",
    href: profile.linkedin,
    external: true,
    ariaLabel: "LinkedIn profile",
    Icon: LinkedInIcon,
  },
  {
    id: "github",
    href: profile.github,
    external: true,
    ariaLabel: "GitHub profile",
    Icon: GitHubIcon,
  },
  {
    id: "instagram",
    href: profile.instagram,
    external: true,
    ariaLabel: "Instagram profile",
    Icon: InstagramIcon,
  },
  {
    id: "whatsapp",
    href: `https://wa.me/${profile.phoneWa}`,
    external: true,
    ariaLabel: "WhatsApp chat",
    Icon: WhatsAppIcon,
  },
  {
    id: "email",
    href: `mailto:${profile.email}`,
    external: false,
    ariaLabel: `Email ${profile.email}`,
    Icon: MailIcon,
  },
] as const;

export function ConnectSection() {
  const reduceMotion = useReducedMotionSafe();
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted(true);
  };

  return (
    <section
      id="connect"
      className="scroll-mt-28 border-t border-black/5 py-24 dark:border-white/10 md:py-32"
      aria-labelledby="connect-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={reduceMotion ? undefined : staggerContainer}
          initial={false}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
        >
          <motion.div variants={reduceMotion ? undefined : fadeIn}>
            <p className="text-[11px] font-medium uppercase tracking-label text-brand">
              Let&apos;s connect
            </p>
            <h2
              id="connect-heading"
              className="mt-3 font-display text-4xl font-light tracking-display text-ink dark:text-white md:text-5xl md:font-normal"
            >
              Talk to {" "}
              <span className="text-accent">me</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted dark:text-zinc-400">
              Leave me a note, a message a problem, or something you would love us to work on together in the form.
              Orrr you can follow me on my social platforms.
            </p>

            <ul
              className="mt-10 flex flex-wrap gap-3"
              aria-label="Social profiles"
            >
              {socialLinks.map(({ id, href, external, ariaLabel, Icon }) => (
                <li key={id}>
                  {external ? (
                    <ExternalLink
                      href={href}
                      aria-label={ariaLabel}
                      title={ariaLabel}
                      className={socialIconLinkClass}
                    >
                      <Icon />
                    </ExternalLink>
                  ) : (
                    <a
                      href={href}
                      aria-label={ariaLabel}
                      title={ariaLabel}
                      className={socialIconLinkClass}
                    >
                      <Icon />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : fadeIn}>
            <form
              onSubmit={onSubmit}
              className="glass-card rounded-3xl p-8 shadow-glass-lg md:p-10"
              noValidate
              aria-describedby="form-footnote"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-ink dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, name: e.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-inner outline-none ring-brand/40 transition focus:ring-2 dark:border-white/10 dark:bg-zinc-950/60 dark:text-white"
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name ? (
                    <p id="err-name" className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-ink dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, email: e.target.value }))
                    }
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-inner outline-none ring-brand/40 transition focus:ring-2 dark:border-white/10 dark:bg-zinc-950/60 dark:text-white"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email ? (
                    <p id="err-email" className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-ink dark:text-white"
                  >
                    How can I help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, message: e.target.value }))
                    }
                    className="mt-2 w-full resize-y rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-ink shadow-inner outline-none ring-brand/40 transition focus:ring-2 dark:border-white/10 dark:bg-zinc-950/60 dark:text-white"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? "err-message" : undefined
                    }
                  />
                  {errors.message ? (
                    <p id="err-message" className="mt-2 text-xs text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent transition hover:bg-accent-muted disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
                  disabled={submitted}
                >
                  {submitted ? "Message captured" : "Send message"}
                </button>
                <p id="form-footnote" className="text-xs text-ink-muted dark:text-zinc-500">
                  Submissions will be connected soon .
                </p>
              </div>

              {submitted ? (
                <p
                  className="mt-6 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-ink dark:text-white"
                  role="status"
                >
                  Thanks — your note is ready to send once the backend is wired.
                  For something urgent, use WhatsApp or email from the links on
                  the left.
                </p>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
