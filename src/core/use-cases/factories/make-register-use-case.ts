import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { RegisterUseCase } from "../users/register";

export function makeRegisterUseCase() {
  const usersRepository = new MethodsUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
