import { MethodsMealsRepository } from "@/repositories/db-meals-repository";
import { ListMealsUseCase } from "../meals/list-meals";

export function makeListMealsUseCase() {
    const mealsRepository = new MethodsMealsRepository();
    const listMealsUseCase = new ListMealsUseCase(mealsRepository);

    return listMealsUseCase;
}