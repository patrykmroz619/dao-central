import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { JWTEntity } from "../../../auth/infrastructure/entities/jwt.entity";
import { DaoEntity } from "../../../dao/infrastructure/entities/dao.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  walletAddress: string;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => JWTEntity, (jwt: JWTEntity) => jwt.user)
  jwts: JWTEntity[];

  @OneToMany(() => DaoEntity, (dao: DaoEntity) => dao.owner)
  daos: DaoEntity;
}
