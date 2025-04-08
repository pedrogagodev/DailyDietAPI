import { AppFlow } from "@/components/AppFlow";
import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col"
    >
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AppFlow />
        <CTASection />
      </main>
    </motion.div>
  );
}
