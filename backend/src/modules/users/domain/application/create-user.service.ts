import { Inject, Injectable, Logger } from "@nestjs/common";

import { UserModel } from "../models/user.model";
import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from "../ports/user-repository.port";

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(
    @Inject(UserRepositoryPortToken)
    private userRepositoryPort: UserRepositoryPort,
  ) {}

  public async createUser(walletAddress: string): Promise<UserModel> {
    const newUser = await this.userRepositoryPort.create(walletAddress);

    this.logger.log(`Created new user with wallet address: ${walletAddress}`);

    return newUser;
  }
}
