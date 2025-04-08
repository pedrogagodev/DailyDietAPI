import { Card, CardContent } from "@/components/ui/card";
import { Award, BarChart2, Calendar, CheckCircle } from "lucide-react";

export function StatsSection() {
  return (
    <section className="bg-muted py-16">
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:w-screen md:px-20">
        <Card className="p-6 shadow-md w-6/7">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-2">
                <CheckCircle className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Easy Tracking</h3>
                <p className="text-muted-foreground">Log meals in seconds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md w-6/7">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-2">
                <BarChart2 className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Visual Stats</h3>
                <p className="text-muted-foreground">Track your progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md w-6/7">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-2">
                <Calendar className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Daily Records</h3>
                <p className="text-muted-foreground">Review past meals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 shadow-md w-6/7">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/20 p-2">
                <Award className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Streak Tracking</h3>
                <p className="text-muted-foreground">Stay motivated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
