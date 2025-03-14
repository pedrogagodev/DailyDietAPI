import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { GetUserProfileUseCase } from "../users/get-user-profile";

export function makeGetProfileUseCase() {
  const usersRepository = new MethodsUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);

  return getUserProfileUseCase;
}
