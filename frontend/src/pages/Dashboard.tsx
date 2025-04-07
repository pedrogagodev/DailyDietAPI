import { MealCard } from "@/components/MealCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";

export default function Dashboard() {
  const { isSignedIn } = useAuth();

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["me", "listMeals"],
    queryFn: () => mealsService.listMeals(),
    enabled: isSignedIn,
  });

  return (
    <div className="w-full min-h-screen px-4 bg-slate-200">
      <div className="flex flex-col items-center justify-between">
        <Card className="w-full bg-green-100 my-4 gap-2">
          <CardHeader className="text-center text-sm">
            <CardTitle>Meals within diet</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-3xl font-bold">
            90,7%
          </CardContent>
        </Card>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <Card className="gap-2">
              <CardTitle className="ml-4 text-sm">Meals registered</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                20
              </CardContent>
            </Card>
            <Card className="gap-2 border-green-500">
              <CardTitle className="ml-4 text-sm">Within diet</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                18
              </CardContent>
            </Card>
            <Card className="gap-2 border-red-500">
              <CardTitle className="ml-4 text-sm">Without diet</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                2
              </CardContent>
            </Card>
            <Card className="gap-2">
              <CardTitle className="ml-4 text-sm">Best sequence</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                7 days
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-full my-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Meals</h2>{" "}
          <Button
            className="font-bold hover:cursor-pointer"
            onClick={() => navigate("/dashboard/meals/create")}
          >
            New meal
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm text-gray-500">12.03.2025</p>
          {data?.meals.map(meal => (
            <MealCard
              key={meal.id}
              dateTime={meal.date_time}
              name={meal.name}
              description={meal.description ?? ""}
              isOnDiet={meal.isOnDiet}
              id={meal.id}
            />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
