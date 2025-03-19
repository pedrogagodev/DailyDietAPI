import { makeChangePasswordUseCase } from "@/use-cases/factories/make-change-password-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function changePassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const changePasswordSchema = z.object({
    currentPassword: z
      .string()
      .min(1, { message: "Please, provide the current password" }),
    newPassword: z.string().min(1, { message: "Please, provide the new password" }),
    confirmPassword: z.string().min(1, { message: "Please, provide the confirm password" }),
  });

  const { currentPassword, newPassword, confirmPassword } = changePasswordSchema.parse(
    request.body
  );

  const changePasswordUseCase = makeChangePasswordUseCase();

  await changePasswordUseCase.execute({
    userId: request.user.sub,
    requestingUserId: request.user.sub,
    currentPassword,
    newPassword,
    confirmPassword,
  });

  return reply.status(201).send({
    message: "Password changed successfully",
  });
}
