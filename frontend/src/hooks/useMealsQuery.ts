import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMealsQuery() {
  const { isSignedIn } = useAuth();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["me", "listMeals", "infinity"],
      staleTime: Number.POSITIVE_INFINITY,
      initialPageParam: 1,
      queryFn: ({ pageParam }) => mealsService.listMeals({ pageParam }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.meals.length < 20) {
          return null;
        }
        return lastPageParam + 1;
      },
      enabled: isSignedIn,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
}
