import fastify from "fastify";
import { usersRoutes } from "@/routes/user-routes";

export const app = fastify();

app.register(usersRoutes);
