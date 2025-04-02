import { makeChangePasswordUseCase } from "@/use-cases/factories/make-change-password-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type ChangePasswordBody = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export async function changePassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { currentPassword, newPassword, confirmPassword } =
    request.body as ChangePasswordBody;

  const changePasswordUseCase = makeChangePasswordUseCase();

  await changePasswordUseCase.execute({
    userId: request.user.sub,
    requestingUserId: request.user.sub,
    currentPassword,
    newPassword,
    confirmPassword,
  });

  return reply.status(200).send({
    message: "Password changed successfully",
  });
}
