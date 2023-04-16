import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserModel } from "../../domain/models/UserModel";
import { UserRepositoryPort } from "../../domain/ports/UserRepositoryPort";

import { UserEntity } from "../entities/users.entity";

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async create(walletAddress: string): Promise<UserModel> {
    const createdUser = await this.usersRepository.save({
      walletAddress: walletAddress.toLowerCase(),
    });

    const createdUserModel = new UserModel(
      createdUser.id,
      createdUser.walletAddress,
    );

    return createdUserModel;
  }

  public async findByWalletAddress(walletAddress: string): Promise<UserModel> {
    const foundUser = await this.usersRepository.findOne({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    const foundUserModel = new UserModel(foundUser.id, foundUser.walletAddress);

    return foundUserModel;
  }
}
