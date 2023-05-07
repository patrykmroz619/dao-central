import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { NODE_ENV } from "src/constants";
import { UserEntity } from "src/modules/users/infrastructure/entities/users.entity";
import { DaoEntity } from "src/modules/dao/infrastructure/entities/dao.entity";
import { ChainEntity } from "src/modules/blockchain/chains/chains.entity";
import { JWTEntity } from "src/modules/auth/infrastructure/entities/jwt.entity";
import { RpcProviderEntity } from "src/modules/blockchain/rpc-providers/rpc-providers.entity";
import { InitLoginEntity } from "src/modules/auth/infrastructure/entities/init-login.entity";
import { DaoExtraLinkEntity } from "src/modules/dao/infrastructure/entities/dao-extra-links.entity";

import { Migration1680041799585 } from "./migrations/1680041799585-Migration";
import { Migration1683478136633 } from "./migrations/1683478136633-Migration";

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
    DaoExtraLinkEntity,
  ],
  migrations: [Migration1680041799585, Migration1683478136633],
  ssl: process.env.NODE_ENV === NODE_ENV.PRODUCTION,
  extra:
    process.env.NODE_ENV === NODE_ENV.PRODUCTION
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
