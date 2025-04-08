import { useAuth } from "@/hooks/useAuth";
import { mealsService } from "@/services/mealsService";
import { useQuery } from "@tanstack/react-query";

export function useMealsOffDiet() {
  const { isSignedIn } = useAuth();

  const { data: mealsOffDiet } = useQuery({
    queryKey: ["me", "mealsOffDiet"],
    queryFn: () => mealsService.mealsOffDiet(),
    enabled: isSignedIn,
  });

  return { mealsOffDiet };
}
