import { HeroSection } from "./hero-section";
import { StoriesSection } from "./stories-section";
import { EvidenceSection } from "./evidence-section";
import { NominateSection } from "./nominate-section";
import { BookSection } from "./book-section";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

interface ContainedAppProps {
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

/**
 * Complete CONTAINED campaign experience
 * Can be embedded into any Next.js application
 */
export function ContainedApp({
  showHeader = true,
  showFooter = true,
  className = ""
}: ContainedAppProps) {
  return (
    <div className={`min-h-screen bg-color-background text-white ${className}`}>
      {showHeader && <SiteHeader />}

      <main className="relative">
        <HeroSection />
        <StoriesSection />
        <EvidenceSection />
        <NominateSection />
        <BookSection />
      </main>

      {showFooter && <SiteFooter />}
    </div>
  );
}

/**
 * Individual section exports for granular integration
 */
export {
  HeroSection,
  StoriesSection,
  EvidenceSection,
  NominateSection,
  BookSection,
  SiteHeader,
  SiteFooter
} from "./index";

/**
 * About page components
 */
export {
  AboutHero,
  ArchitectsSection,
  TruthSpeakersSection,
  BuildProcessSection,
  CommunitySection,
  EconomicsSection,
  VisionSection,
  GetInvolvedSection,
  AboutNavigation
} from "./about/index";