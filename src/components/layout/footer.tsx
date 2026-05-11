import { profile } from "@/lib/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 px-6 py-12 text-center text-[10px] font-medium uppercase tracking-label text-ink-muted dark:border-white/10 dark:text-zinc-500">
      <p>
        © {year} {profile.fullName}.
      </p>
    </footer>
  );
}
