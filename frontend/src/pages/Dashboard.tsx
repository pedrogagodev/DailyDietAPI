import { EmptyMeals } from "@/components/EmptyMeals";
import { MealCard } from "@/components/MealCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import type { GetMealsResponse } from "@/types/listMeals";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";

interface MealByDate {
  date: string;
  meals: GetMealsResponse["meals"];
}

export default function Dashboard() {
  const { isSignedIn } = useAuth();

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["me", "listMeals"],
    queryFn: () => mealsService.listMeals(),
    enabled: isSignedIn,
  });

  const { data: sequence } = useQuery({
    queryKey: ["me", "getSequence"],
    queryFn: () => mealsService.getSequence(),
    enabled: isSignedIn,
  });

  const dates: Set<string> = new Set();
  for (const meal of data?.meals ?? []) {
    dates.add(meal.createdAt.slice(0, 10).replace(/-/g, "."));
  }

  const datesArray = Array.from(dates);

  const mealsByDate: MealByDate[] = datesArray.map(date => ({
    date,
    meals: data?.meals.filter(meal => meal.createdAt.slice(0, 10).replace(/-/g, ".") === date) ?? [],
  }));

  const mealsWithinDietPercentage =
    data?.meals &&
    (
      (data?.meals.filter(meal => meal.isOnDiet).length / data?.meals.length) *
      100
    ).toFixed(1);

  return (
    <div className="w-full min-h-screen px-4 bg-slate-200">
      <div className="flex flex-col items-center justify-between">
        <Card
          className={`w-full ${mealsWithinDietPercentage && Number(mealsWithinDietPercentage) >= 50 ? "bg-green-200" : "bg-red-400"} my-4 gap-2`}
        >
          <CardHeader className="text-center text-sm">
            <CardTitle>Meals within diet</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-3xl font-bold">
            {mealsWithinDietPercentage !== "NaN"
              ? mealsWithinDietPercentage
              : 0}
            %
          </CardContent>
        </Card>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <Card className="gap-2">
              <CardTitle className="ml-4 text-sm">Meals registered</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                {data?.meals.length}
              </CardContent>
            </Card>
            <Card className="gap-2 border-green-500">
              <CardTitle className="ml-4 text-sm">Within diet</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                {data?.meals.filter(meal => meal.isOnDiet).length}
              </CardContent>
            </Card>
            <Card className="gap-2 border-red-500">
              <CardTitle className="ml-4 text-sm">Without diet</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                {data?.meals.filter(meal => !meal.isOnDiet).length}
              </CardContent>
            </Card>
            <Card className="gap-2">
              <CardTitle className="ml-4 text-sm">Best sequence</CardTitle>
              <CardContent className="text-2xl font-bold p-0 ml-4">
                {sequence?.longestOnDietSequence ?? 0}
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
          <p className="text-sm text-gray-500">
            {data?.meals.length} meals registered
          </p>
          {data?.meals.length === 0 ? <EmptyMeals /> : null}
          {mealsByDate.map(meals => (
            <div key={meals?.date} className="flex flex-col gap-2 mt-4">
              <h3 className="text-sm text-gray-500">{meals?.date}</h3>
              {meals?.meals?.map(meal => (
                <MealCard
                  key={meal.id}
                  mealTime={meal.mealTime}
                  name={meal.name}
                  description={meal.description ?? ""}
                  isOnDiet={meal.isOnDiet}
                  id={meal.id}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
