import { Injectable } from "@nestjs/common";

import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { UserModel } from "../models/UserModel";

@Injectable()
export class FindUserService {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async findByWallet(walletAddress: string): Promise<UserModel> {
    const user = await this.userRepositoryPort.findByWalletAddress(
      walletAddress,
    );

    return user;
  }
}
