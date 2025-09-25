import { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { ArchitectsSection } from "@/components/about/architects-section";
import { TruthSpeakersSection } from "@/components/about/truth-speakers-section";
import { CommunitySection } from "@/components/about/community-section";
import { BuildProcessSection } from "@/components/about/build-process-section";
import { EconomicsSection } from "@/components/about/economics-section";
import { VisionSection } from "@/components/about/vision-section";
import { GetInvolvedSection } from "@/components/about/get-involved-section";
import { AboutNavigation } from "@/components/about/about-navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "About CONTAINED - The Genesis of Transformation",
  description: "Revolution doesn't announce itself with press releases. It builds in garages and community centres, in the spaces between heartbeats, in the moment a kid realizes someone actually gives a damn.",
  openGraph: {
    title: "About CONTAINED - The Genesis of Transformation",
    description: "The story behind Australia's most powerful youth justice intervention.",
    images: ["/images/about/contained-team.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-color-background text-white">
      <SiteHeader />
      <AboutNavigation />

      <main className="relative">
        <AboutHero />
        <ArchitectsSection />
        <TruthSpeakersSection />
        <BuildProcessSection />
        <CommunitySection />
        <EconomicsSection />
        <VisionSection />
        <GetInvolvedSection />
      </main>

      <SiteFooter />
    </div>
  );
}