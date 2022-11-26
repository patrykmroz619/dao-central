import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { JWTEntity } from "../auth/jwt/jwt.entity";

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

  @OneToMany(() => JWTEntity, (jwt) => jwt.user)
  jwts: JWTEntity[];
}
