import { createMeal } from "@/http/controllers/meals/create-meal";
import { deleteMeal } from "@/http/controllers/meals/delete-meal";
import { getLongestOnDietSequence } from "@/http/controllers/meals/get-longest-on-diet-sequence";
import { getMealInfo } from "@/http/controllers/meals/get-meal-info";
import { getMealsOffDietNumber } from "@/http/controllers/meals/get-meals-off-diet-number";
import { getMealsOnDietNumber } from "@/http/controllers/meals/get-meals-on-diet-number";
import { getTotalMealsNumber } from "@/http/controllers/meals/get-total-meals-number";
import { listMeals } from "@/http/controllers/meals/list-meals";
import { updateMeal } from "@/http/controllers/meals/update-meal";
import { ensureMealOwnershipMiddleware } from "@/http/middlewares/ensure-meal-ownership";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import {
  createMealBodySchema,
  createMealResponseSchema,
} from "@/schemas/meals/create-meal-schema";
import { deleteMealSchema } from "@/schemas/meals/delete-meal-schema";
import { deleteMealResponseSchema } from "@/schemas/meals/delete-meal-schema";
import { getLongestOnDietSequenceResponseSchema } from "@/schemas/meals/get-longest-on-diet-sequence-schema";
import {
  getMealInfoResponseSchema,
  getMealInfoSchema,
} from "@/schemas/meals/get-meal-info-schema";
import { getMealsOffDietNumberResponseSchema } from "@/schemas/meals/get-meals-off-diet-number-schema";
import { getMealsOnDietNumberResponseSchema } from "@/schemas/meals/get-meals-on-diet-number-schema";
import { getTotalMealsNumberResponseSchema } from "@/schemas/meals/get-total-meals-schema";
import { listMealsResponseSchema } from "@/schemas/meals/list-meals-schema";
import {
  updateMealBodySchema,
  updateMealResponseSchema,
  updateMealSchema,
} from "@/schemas/meals/update-meal-schema";
import type { FastifyInstance } from "fastify";
import type { FastifyZodOpenApiTypeProvider } from "fastify-zod-openapi";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "POST",
    url: "/me/meals",
    schema: {
      body: createMealBodySchema,
      tags: ["meals"],
      summary: "Create a new meal",
      description: "Create a new meal",
      response: createMealResponseSchema,
    },
    handler: createMeal,
  });

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals",
    schema: {
      tags: ["meals"],
      summary: "List all meals",
      description: "List all meals",
      response: listMealsResponseSchema,
    },
    handler: listMeals,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals/total",
    schema: {
      tags: ["meals"],
      summary: "Get total meals number",
      description: "Get total meals number",
      response: getTotalMealsNumberResponseSchema,
    },
    handler: getTotalMealsNumber,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals/on-diet",
    schema: {
      tags: ["meals"],
      summary: "Get meals on diet number",
      description: "Get meals on diet number",
      response: getMealsOnDietNumberResponseSchema,
    },
    handler: getMealsOnDietNumber,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals/off-diet",
    schema: {
      tags: ["meals"],
      summary: "Get meals off diet number",
      description: "Get meals off diet number",
      response: getMealsOffDietNumberResponseSchema,
    },
    handler: getMealsOffDietNumber,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals/longest-on-diet-sequence",
    schema: {
      tags: ["meals"],
      summary: "Get longest on diet sequence",
      description: "Get longest on diet sequence",
      response: getLongestOnDietSequenceResponseSchema,
    },
    handler: getLongestOnDietSequence,
  });
  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "GET",
    url: "/me/meals/:mealId",
    schema: {
      params: getMealInfoSchema,
      tags: ["meals"],
      summary: "Get meal info",
      description: "Get meal info",
      response: getMealInfoResponseSchema,
    },
    onRequest: [ensureMealOwnershipMiddleware],
    handler: getMealInfo,
  });

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "PUT",
    url: "/me/meals/:mealId",
    schema: {
      params: updateMealSchema,
      body: updateMealBodySchema,
      tags: ["meals"],
      summary: "Update meal",
      description: "Update meal",
      response: updateMealResponseSchema,
    },
    onRequest: [ensureMealOwnershipMiddleware],
    handler: updateMeal,
  });

  app.withTypeProvider<FastifyZodOpenApiTypeProvider>().route({
    method: "DELETE",
    url: "/me/meals/:mealId",
    schema: {
      params: deleteMealSchema,
      tags: ["meals"],
      summary: "Delete meal",
      description: "Delete meal",
      response: deleteMealResponseSchema,
    },
    onRequest: [ensureMealOwnershipMiddleware],
    handler: deleteMeal,
  });
}
