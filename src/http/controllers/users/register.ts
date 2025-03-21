import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export async function register(request: FastifyRequest, reply: FastifyReply) {
  
  const { name, email, password } = request.body as RegisterBody;

  const registerUserCase = makeRegisterUseCase();

  const { user } = await registerUserCase.execute({
    name,
    email,
    password,
  });

  return reply.status(201).send({ id: user.id });
}
