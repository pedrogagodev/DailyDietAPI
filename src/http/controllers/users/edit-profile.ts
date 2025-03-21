import { makeEditProfileUseCase } from "@/use-cases/factories/make-edit-profile-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";

type EditProfileBody = {
  name: string;
  email: string;
  currentPassword: string;
};

export async function editProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, email, currentPassword } = request.body as EditProfileBody;

  const editProfileUseCase = makeEditProfileUseCase();

  const { user } = await editProfileUseCase.execute({
    userId: request.user.sub,
    requestingUserId: request.user.sub,
    name,
    email,
    currentPassword,
  });

  return reply.status(200).send({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
