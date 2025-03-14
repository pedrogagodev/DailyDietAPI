import type { User } from "@/core/entities/user";
import type { UsersRepository } from "@/core/repositories/users-repository";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User | null;
}

export class GetUserProfileUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(
    request: GetUserProfileRequest
  ): Promise<GetUserProfileResponse> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
