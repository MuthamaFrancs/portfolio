import { FloatingNav } from "@/components/layout/floating-nav";
import { SiteFooter } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsAchievementsSection } from "@/components/sections/projects-achievements";
import { TechArsenalSection } from "@/components/sections/tech-arsenal";
import { CareerRoadmapSection } from "@/components/sections/career-roadmap";
import { SideQuestsSection } from "@/components/sections/side-quests";
import { ConnectSection } from "@/components/sections/connect";

export default function HomePage() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <FloatingNav />
      <main id="main">
        <HeroSection />
        <ProjectsAchievementsSection />
        <TechArsenalSection />
        <CareerRoadmapSection />
        <SideQuestsSection />
        <ConnectSection />
      </main>
      <SiteFooter />
    </>
  );
}
