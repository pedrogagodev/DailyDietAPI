import { createMeal } from "./createMeal";
import { deleteMeal } from "./deleteMeal";
import { editMeal } from "./editMeal";
import { getSequence } from "./getSequence";
import { listMeals } from "./listMeals";

export const mealsService = {
  createMeal,
  listMeals,
  editMeal,
  getSequence,
  deleteMeal,
};
