import { Inject, Injectable } from "@nestjs/common";

import {
  UserRepositoryPort,
  UserRepositoryPortToken,
} from "../ports/user-repository.port";

@Injectable()
export class FindUserService {
  constructor(
    @Inject(UserRepositoryPortToken)
    private userRepositoryPort: UserRepositoryPort,
  ) {}

  async findByWallet(walletAddress: string) {
    const user = await this.userRepositoryPort.findByWalletAddress(
      walletAddress,
    );

    return user;
  }

  async findById(userId: string) {
    const user = await this.userRepositoryPort.findById(userId);

    return user;
  }
}
