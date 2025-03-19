import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { ChangePasswordUseCase } from "../users/change-password";

export function makeChangePasswordUseCase() {
  const usersRepository = new MethodsUsersRepository();
  const changePasswordUseCase = new ChangePasswordUseCase(usersRepository);

  return changePasswordUseCase;
}
