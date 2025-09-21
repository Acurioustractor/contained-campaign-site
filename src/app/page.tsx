import { ActionTracks } from "@/components/action-tracks";
import { ActivityFeed } from "@/components/activity-feed";
import { EvidenceGrid } from "@/components/evidence-grid";
import { CTAButton } from "@/components/cta-button";
import { BookingForm } from "@/components/forms/booking-form";
import { NominationForm } from "@/components/forms/nomination-form";
import { Hero } from "@/components/hero";
import { JourneySection } from "@/components/journey-section";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StoriesSection } from "@/components/stories-section";
import { UrgencyBanner } from "@/components/urgency-banner";
import { campaignMetadata, narrativePillars } from "@/content/campaign";

export default function Home() {
  return (
    <div className="min-h-screen bg-color-background text-white">
      <SiteHeader />
      <main id="main-content" className="relative">
        <Hero />

        <section className="bg-color-container-black px-6 py-24 sm:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-10" id="journey">
            <SectionHeading
              eyebrow="Why now"
              title="Transform awareness into action"
              description="Lead with human impact, follow with data. Use these pillars to brief media, funders, and political staffers before they step inside the containers."
              align="left"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {narrativePillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-3xl border border-white/25 bg-[rgba(15,22,30,0.95)] p-6 shadow-lg shadow-black/40 backdrop-blur"
                >
                  <h3 className="font-display text-2xl uppercase tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/95">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <JourneySection />
        <StoriesSection />
        <ActionTracks />

        <section
          id="nominate"
          className="bg-color-container-black px-6 py-24 text-white sm:px-12"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <SectionHeading
              title="Nominate a decision maker"
              description="Tell us who needs to experience CONTAINED. We follow up with personalised invitations and track who accepts."
              align="left"
            />
            <div className="panel-darker rounded-3xl p-8">
              <NominationForm />
            </div>
          </div>
        </section>

        <section
          id="book"
          className="bg-color-container-steel px-6 py-24 text-white sm:px-12"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12">
            <SectionHeading
              title="Book your experience"
              description="Secure a 30-minute slot for yourself, your team, or a group of decision makers. Pay what you can—no one is turned away."
              align="left"
            />
            <div className="panel-darker rounded-3xl p-8">
              <BookingForm />
            </div>
          </div>
        </section>

        <ActivityFeed />
        <EvidenceGrid />

        <section className="relative overflow-hidden bg-gradient-to-r from-[rgba(22,30,38,0.95)] via-[rgba(15,22,30,0.98)] to-[rgba(30,46,60,0.95)] px-6 py-24 text-white sm:px-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(230,126,34,0.25),transparent_55%)] opacity-80" aria-hidden />
          <div className="mx-auto flex max-w-6xl flex-col gap-8 text-center">
            <span className="font-display text-sm uppercase tracking-[0.25em] text-color-warning-orange/90">
              Stay in the loop
            </span>
            <h2 className="font-display text-4xl uppercase tracking-tight">
              Keep pressure rising
            </h2>
            <p className="mx-auto max-w-3xl text-base text-white/88">
              Get the latest container openings, political responses, and impact stories so you can push for change the moment it happens.
            </p>
            <div className="text-sm text-white/65">
              Launch date: {new Date(campaignMetadata.launchDate).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CTAButton href="https://act.place/newsletter" variant="accent">
                Join the newsletter
              </CTAButton>
              <CTAButton href="#nominate" variant="light">
                Nominate a leader now
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <UrgencyBanner />
    </div>
  );
}
