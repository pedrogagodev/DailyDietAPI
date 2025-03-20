import { DatabaseConnectionError } from "@/errors/database-connection-error";
import { IncorrectPasswordError } from "@/errors/incorrect-password-error";
import { InvalidMealDataError } from "@/errors/invalid-meal-data-error";
import { InvalidPasswordError } from "@/errors/invalid-password-error";
import { MealNotFoundError } from "@/errors/meal-not-found";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UnauthorizedAccessError } from "@/errors/unauthorized-access-error";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UserNotFoundError } from "@/errors/user-not-found";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

interface ErrorResponse {
  status: "error";
  message: string;
  details?: Record<string, string[] | undefined>;
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error({
    error: error.message,
    stack: error.stack,
    method: request.method,
    url: request.url,
  });

  const response: ErrorResponse = {
    status: "error",
    message: error.message || "Internal server error",
    details: undefined,
  };

  if (error instanceof ZodError) {
    response.message = "Validation error";
    response.details = error.flatten().fieldErrors;
    return reply.status(400).send(response);
  }
  if (error instanceof InvalidMealDataError) {
    return reply.status(400).send(response);
  }

  if (error instanceof InvalidPasswordError) {
    return reply.status(400).send(response);
  }

  if (error instanceof IncorrectPasswordError) {
    return reply.status(400).send({
      status: "error",
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedAccessError) {
    return reply.status(403).send(response);
  }

  if (error instanceof UserNotFoundError) {
    return reply.status(404).send(response);
  }

  if (
    error instanceof MealNotFoundError ||
    error instanceof ResourceNotFoundError
  ) {
    return reply.status(404).send(response);
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send(response);
  }

  if (error instanceof DatabaseConnectionError) {
    return reply.status(500).send(response);
  }

  return reply.status(500).send(response);
}
