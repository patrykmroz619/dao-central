import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { UserEntity } from "src/modules/users/infrastructure/entities/users.entity";
import { JWTType } from "../../domain/interfaces/jwt.interfaces";

@Entity({ name: "jwts" })
export class JWTEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.jwts)
  user: UserEntity;

  @Column()
  code: string;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUsed: Date;

  @Column({
    default: true,
  })
  active: boolean;

  @Column()
  type: JWTType;
}
