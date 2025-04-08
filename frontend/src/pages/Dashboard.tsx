import { EmptyMeals } from "@/components/EmptyMeals";
import { MealCard } from "@/components/MealCard";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useMealsOffDiet } from "@/hooks/useMealsOffDiet";
import { useMealsOnDiet } from "@/hooks/useMealsOnDiet";
import { useMealsQuery } from "@/hooks/useMealsQuery";
import { useTotalMeals } from "@/hooks/useTotalMeals";
import { mealsService } from "@/services/mealsService";
import type { GetMealsResponse } from "@/types/listMeals";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router";

interface MealByDate {
  date: string;
  meals: GetMealsResponse["meals"];
}

export default function Dashboard() {
  const { isSignedIn } = useAuth();

  const { mealsOnDiet } = useMealsOnDiet();
  const { mealsOffDiet } = useMealsOffDiet();
  const { totalMeals } = useTotalMeals();
  const navigate = useNavigate();

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useMealsQuery();

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        const { isIntersecting } = entries[0];

        if (!hasNextPage) {
          obs.disconnect();
          return;
        }

        if (isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "20%",
      }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { data: sequence } = useQuery({
    queryKey: ["me", "getSequence"],
    queryFn: () => mealsService.getSequence(),
    enabled: isSignedIn,
  });

  const dates: Set<string> = new Set();
  for (const meal of data?.pages.flatMap(page => page.meals) ?? []) {
    const [year, month, day] = meal.createdAt.slice(0, 10).split("-");
    const formattedDate = `${month}/${day}/${year.slice(-2)}`;
    dates.add(formattedDate);
  }

  const datesArray = Array.from(dates);

  const mealsByDate: MealByDate[] = datesArray.map(date => ({
    date,
    meals:
      data?.pages
        .flatMap(page => page.meals)
        .filter(meal => {
          const [year, month, day] = meal.createdAt.slice(0, 10).split("-");
          return `${month}/${day}/${year.slice(-2)}` === date;
        }) ?? [],
  }));

  const mealsWithinDietPercentage = (
    ((mealsOnDiet?.mealsOnDietNumber ?? 0) / (totalMeals?.mealsNumber ?? 0)) *
    100
  ).toFixed(1);

  return (
    <div className="w-full min-h-screen px-4 bg-gray-200 dark:bg-background">
      <div className="flex flex-col min-h-screen">
        <div>
          <Card
            className={`w-full ${mealsWithinDietPercentage && Number(mealsWithinDietPercentage) >= 50 ? "bg-primary/80" : "bg-destructive/90"} my-4 gap-2`}
          >
            <CardHeader className="text-center text-sm">
              <CardTitle>Meals within diet</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-3xl font-bold">
              {mealsWithinDietPercentage === 'NaN' ? "0" : mealsWithinDietPercentage}%
            </CardContent>
          </Card>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4">
              <Card className="gap-2">
                <CardTitle className="ml-4 text-sm">Meals registered</CardTitle>
                <CardContent className="text-2xl font-bold p-0 ml-4">
                  {totalMeals?.mealsNumber}
                </CardContent>
              </Card>
              <Card className="gap-2 border-primary border-2">
                <CardTitle className="ml-4 text-sm">Within diet</CardTitle>
                <CardContent className="text-2xl font-bold p-0 ml-4">
                  {mealsOnDiet?.mealsOnDietNumber}
                </CardContent>
              </Card>
              <Card className="gap-2 border-destructive border-2">
                <CardTitle className="ml-4 text-sm">Without diet</CardTitle>
                <CardContent className="text-2xl font-bold p-0 ml-4">
                  {mealsOffDiet?.mealsOffDietNumber}
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

        <div className="w-full my-6 flex-grow">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Meals</h2>
            <Button
              className="font-bold hover:cursor-pointer"
              onClick={() => navigate("/dashboard/meals/create")}
            >
              New meal
            </Button>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {data?.pages.flatMap(page => page.meals).length === 0 ? (
              <EmptyMeals />
            ) : null}
            {mealsByDate.map(meals => (
              <div key={meals?.date} className="flex flex-col gap-4 mt-4">
                <h3 className="font-bold">{meals?.date}</h3>
                {meals?.meals
                  ?.slice()
                  .sort((a, b) => b.mealTime.localeCompare(a.mealTime))
                  .map(meal => (
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

        <div>
          <Outlet />
          <div ref={bottomRef}>
            {isFetchingNextPage && (
              <div className="flex items-center gap-2">
                <Spinner /> <span>Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
