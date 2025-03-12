import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { UpdateMealUseCase } from "../meals/update-meal";

export function makeDeleteMealUseCase() {
    const mealsRepository = new MethodsMealsRepository();
    const updateMealUseCase = new UpdateMealUseCase(mealsRepository);

    return updateMealUseCase;
}