import type { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(role: "ADMIN" | "USER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role: userRole } = request.user;

    if (userRole !== role) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  };
}
