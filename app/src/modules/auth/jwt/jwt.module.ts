import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "src/modules/users/users.module";
import { JWTEntity } from "./jwt.entity";
import { JWTService } from "./jwt.service";

@Module({
  providers: [JWTService],
  imports: [
    UsersModule,
    NestJwtModule.register({}),
    TypeOrmModule.forFeature([JWTEntity]),
  ],
  exports: [JWTService],
})
export class JwtModule {}
