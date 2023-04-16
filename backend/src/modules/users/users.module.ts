import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CreateUserService } from "./domain/application/create-user.service";
import { FindUserService } from "./domain/application/find-user.service";
import { UserRepositoryPortToken } from "./domain/ports/user-repository.port";

import { UserEntity } from "./infrastructure/entities/users.entity";
import { UserRepository } from "./infrastructure/repositories/user.repository";

import { UsersController } from "./presentation/rest/users.controller";
import { UsersService } from "./presentation/services/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    { provide: UserRepositoryPortToken, useClass: UserRepository },
    CreateUserService,
    FindUserService,
    UsersService,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
