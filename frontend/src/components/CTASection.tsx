import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to transform your diet?
        </h2>
        <p className="mt-4 mx-auto max-w-[42rem]">
          Join thousands of users who have improved their eating habits with
          Daily Diet. Start tracking your meals today.
        </p>
        <div className="mt-10">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register">
              Start your free account
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
