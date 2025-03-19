import { makeEditProfileUseCase } from "@/use-cases/factories/make-edit-profile-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function editProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const editProfileSchema = z.object({
    name: z.string().min(1, { message: "Please, provide a name" }),
    email: z.string().email({ message: "Invalid email" }),
    currentPassword: z
      .string()
      .min(1, { message: "Please, provide the current password" }),
  });

  const { name, email, currentPassword } = editProfileSchema.parse(
    request.body
  );

  const editProfileUseCase = makeEditProfileUseCase();

  const { user } = await editProfileUseCase.execute({
    userId: request.user.sub,
    requestingUserId: request.user.sub,
    name,
    email,
    currentPassword,
  });

  return reply.status(201).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
