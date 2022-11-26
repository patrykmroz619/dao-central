import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "./users.entity";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(walletAddress: string): Promise<UserEntity> {
    const newUser = await this.usersRepository.save({
      walletAddress: walletAddress.toLowerCase(),
    });

    this.logger.log(`Created new user with wallet address: ${walletAddress}`);

    return newUser;
  }

  async getUser(walletAddress: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
      where: { walletAddress: walletAddress.toLowerCase() },
    });
  }
}
