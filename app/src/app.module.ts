import { Module } from "@nestjs/common";
import { ConfigModule } from "./modules/config/config.module";
import { DatabaseModule } from "./modules/database/database.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule],
})
export class AppModule {}
