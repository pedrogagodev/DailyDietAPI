import { makeRegisterUseCase } from "@/core/use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createAccountSchema = z.object({
    name: z.string().min(1, { message: "Please, provide a name" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Invalid password" })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  });

  const { name, email, password } = createAccountSchema.parse(request.body);

  try {
    const registerUserCase = makeRegisterUseCase();

    await registerUserCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
