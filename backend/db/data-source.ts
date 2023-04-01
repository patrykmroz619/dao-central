import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { NODE_ENV } from "src/constants";
import { UserEntity } from "src/modules/users/users.entity";
import { DaoEntity } from "src/modules/dao/dao.entity";
import { ChainEntity } from "src/modules/blockchain/chains/chains.entity";
import { JWTEntity } from "src/modules/auth/jwt/jwt.entity";
import { RpcProviderEntity } from "src/modules/blockchain/rpc-providers/rpc-providers.entity";
import { InitLoginEntity } from "src/modules/auth/init-login.entity";
import { Migration1680041799585 } from "./migrations/1680041799585-Migration";

config();

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as "mysql" | "mariadb" | "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: process.env.NODE_ENV !== NODE_ENV.PRODUCTION,
  logging: process.env.NODE_ENV === NODE_ENV.DEVELOPMENT,
  bigNumberStrings: false,
  entities: [
    UserEntity,
    DaoEntity,
    ChainEntity,
    JWTEntity,
    RpcProviderEntity,
    InitLoginEntity,
  ],
  migrations: [Migration1680041799585],
  ssl:
    process.env.NODE_ENV === NODE_ENV.PRODUCTION
      ? { rejectUnauthorized: false }
      : false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
