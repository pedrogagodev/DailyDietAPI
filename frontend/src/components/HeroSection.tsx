import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative overflow-hidden py-20 md:py-32">
      <div className="flex flex-col items-center text-center">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
          Track your meals, achieve your goals
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your personal <span className="text-primary">diet tracker</span>
        </h1>
        <p className="mt-6 max-w-[42rem] text-muted-foreground sm:text-xl">
          Monitor your daily meals, track your diet progress, and maintain
          healthy eating habits with our simple and effective diet tracking app.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/register">
              Start tracking free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
