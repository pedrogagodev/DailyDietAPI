import { MethodsUsersRepository } from "@/repositories/db-users-repository";
import { EditProfileUseCase } from "../users/edit-profile";

export function makeEditProfileUseCase() {
  const usersRepository = new MethodsUsersRepository();
  const editProfileUseCase = new EditProfileUseCase(usersRepository);

  return editProfileUseCase;
}
