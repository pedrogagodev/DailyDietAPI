import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import { useQuery } from "@tanstack/react-query";

export function useTotalMeals() {
  const { isSignedIn } = useAuth();

  const { data: totalMeals } = useQuery({
    queryKey: ["me", "totalMeals"],
    queryFn: () => mealsService.totalMeals(),
    enabled: isSignedIn,
  });

  return { totalMeals };
}
