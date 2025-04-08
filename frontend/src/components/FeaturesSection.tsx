import {
  ArrowRight,
  Award,
  BarChart2,
  Calendar,
  CheckCircle,
  Utensils,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">

        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to track your diet
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our app provides all the tools you need to monitor your meals and
            stay on track with your dietary goals.
          </p>
        </div>

        <div className="mt-16 min-w-screen px-12 md:px-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Utensils className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Meal Logging</h3>
              <p className="mt-2 text-muted-foreground">
                Quickly log your meals with time, description, and whether
                they're within your diet plan.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <BarChart2 className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                View your diet adherence percentage and track how well you're
                sticking to your plan.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Streak Records</h3>
              <p className="mt-2 text-muted-foreground">
                Keep track of your best sequence of consecutive meals within
                your diet plan.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Daily Overview</h3>
              <p className="mt-2 text-muted-foreground">
                See all your meals organized by date for easy review and
                planning.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Diet Indicators</h3>
              <p className="mt-2 text-muted-foreground">
                Visual indicators show which meals are within your diet plan at
                a glance.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md">
            <CardContent>
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <ArrowRight className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Easy Editing</h3>
              <p className="mt-2 text-muted-foreground">
                Edit or delete meal entries anytime to keep your records
                accurate.
              </p>
            </CardContent>
          </Card>
        </div>
    </section>
  );
}
