import { Injectable } from "@nestjs/common";

import { CreateUserService } from "../../domain/application/create-user.service";
import { FindUserService } from "../../domain/application/find-user.service";

@Injectable()
export class UsersService {
  constructor(
    private createUserService: CreateUserService,
    private findUserService: FindUserService,
  ) {}

  public async create(walletAddress: string) {
    return this.createUserService.createUser(walletAddress);
  }

  public async findByWallet(walletAddress: string) {
    return this.findUserService.findByWallet(walletAddress);
  }

  public async findById(userId: string) {
    return this.findUserService.findById(userId);
  }
}
