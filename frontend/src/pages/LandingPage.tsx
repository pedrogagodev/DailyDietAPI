import { AppFlow } from "@/components/AppFlow";
import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AppFlow />
        <CTASection />
      </main>
    </div>
  );
}
