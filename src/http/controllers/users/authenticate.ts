import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
  
type AuthenticateBody = {
  email: string;
  password: string;
};

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, password } = request.body as AuthenticateBody;
  const authenticateUseCase = makeAuthenticateUseCase();

  const { user } = await authenticateUseCase.execute({
    email,
    password,
  });

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
