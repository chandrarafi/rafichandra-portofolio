import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import GitHubActivitySection from "@/components/sections/GithubActivitySection";
import ProjectSection from "@/components/sections/ProjectSection";
import CertificationSection from "@/components/sections/CertificationSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      {/* <SkillsSection /> */}
      {/* <GitHubActivitySection /> */}
      <ProjectSection />
      <CertificationSection />
    </main>
  );
}
