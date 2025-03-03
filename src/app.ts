import fastify from "fastify";
import { usersRoutes } from "@/routes/user-routes";
import { mealsRoutes } from "@/routes/meal-routes";

export const app = fastify();

app.register(usersRoutes);
app.register(mealsRoutes);
