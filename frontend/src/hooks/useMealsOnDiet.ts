import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import { useQuery } from "@tanstack/react-query";

export function useMealsOnDiet() {
  const { isSignedIn } = useAuth();

  const { data: mealsOnDiet } = useQuery({
    queryKey: ["me", "mealsOnDiet"],
    queryFn: () => mealsService.mealsOnDiet(),
    enabled: isSignedIn,
  });

  return { mealsOnDiet };
}
