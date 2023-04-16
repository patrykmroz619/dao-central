import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

import { UserModel } from "../../domain/models/user.model";
import { UserRepositoryPort } from "../../domain/ports/user-repository.port";

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

  public async findByWalletAddress(walletAddress: string) {
    return await this.findUser({
      walletAddress: walletAddress.toLowerCase(),
    });
  }

  public async findById(userId: string) {
    return await this.findUser({
      id: userId,
    });
  }

  private async findUser(where: FindOptionsWhere<UserEntity>) {
    const foundUser = await this.usersRepository.findOne({
      where: where,
    });

    if (!foundUser) {
      return null;
    }

    const foundUserModel = new UserModel(foundUser.id, foundUser.walletAddress);

    return foundUserModel;
  }
}
