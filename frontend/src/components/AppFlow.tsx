import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export function AppFlow() {
  return (
    <section id="how-it-works" className="bg-muted py-20">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          How Daily Diet works
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start tracking your meals and improving your diet in just a few simple
          steps.
        </p>
      </div>

      <div className="mt-16 min-w-screen px-12 md:px-24 grid gap-8 md:grid-cols-3">
        <Card className="relative rounded-xl bg-card p-6 shadow-sm">
          <div className="absolute -top-4 -left-4 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            1
          </div>

          <CardHeader>
            <h3 className="text-xl font-bold">Create an account</h3>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Sign up for free and set up your profile in seconds.
            </p>
          </CardContent>
        </Card>

        <Card className="relative rounded-xl bg-card p-6 shadow-sm">
          <div className="absolute -top-4 -left-4 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            2
          </div>
          <CardHeader>
            <h3 className="text-xl font-bold">Log your meals</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Add meals with time, description, and diet status.
            </p>
          </CardContent>
        </Card>

        <Card className="relative rounded-xl bg-card p-6 shadow-sm">
          <div className="absolute -top-4 -left-4 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            3
          </div>
          <CardHeader>
            <h3 className="text-xl font-bold">Track your progress</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Monitor your diet adherence and streak records.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 flex justify-center">
        <Button size="lg" asChild>
          <Link to="/register">
            Get started now
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
