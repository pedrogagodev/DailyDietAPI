import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { AuthenticateUseCase } from "../users/authenticate";

export function makeAuthenticateUseCase() {
  const usersRepository = new MethodsUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
