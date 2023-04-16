import { Injectable } from "@nestjs/common";
import { UsersService } from "src/modules/users/presentation/services/users.service";
import { LoginUserRepositoryPort } from "../../domain/ports/login-user-repository.port";

@Injectable()
export class LoginUserRepository implements LoginUserRepositoryPort {
  constructor(private usersService: UsersService) {}

  public async findOrCreate(walletAddress: string): Promise<string> {
    const user = await this.usersService.findByWallet(walletAddress);

    if (!user) {
      const newUser = await this.usersService.create(walletAddress);
      return newUser.id;
    }

    return user.id;
  }
}
