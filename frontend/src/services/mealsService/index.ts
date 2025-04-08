import { createMeal } from "./createMeal";
import { deleteMeal } from "./deleteMeal";
import { editMeal } from "./editMeal";
import { mealsOffDiet } from "./getMealsOffDiet";
import { mealsOnDiet } from "./getMealsOnDiet";
import { getSequence } from "./getSequence";
import { totalMeals } from "./getTotalMeals";
import { listMeals } from "./listMeals";

export const mealsService = {
  createMeal,
  listMeals,
  editMeal,
  getSequence,
  deleteMeal,
  mealsOnDiet,
  mealsOffDiet,
  totalMeals,
};
