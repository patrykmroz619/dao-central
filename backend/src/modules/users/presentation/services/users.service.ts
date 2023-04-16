import { Injectable } from "@nestjs/common";

import { CreateUserService } from "../../domain/application/create-user.service";
import { FindUserService } from "../../domain/application/find-user.service";
import { UserModel } from "../../domain/models/UserModel";

@Injectable()
export class UsersService {
  constructor(
    private createUserService: CreateUserService,
    private findUserService: FindUserService,
  ) {}

  public async create(walletAddress: string): Promise<UserModel> {
    return this.createUserService.createUser(walletAddress);
  }

  public async findByWallet(walletAddress: string): Promise<UserModel> {
    return this.findUserService.findByWallet(walletAddress);
  }
}
