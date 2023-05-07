import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ChainEntity } from "../../../blockchain/chains/chains.entity";
import { UserEntity } from "../../../users/infrastructure/entities/users.entity";
import { DaoExtraLinkEntity } from "./dao-extra-links.entity";

@Entity({ name: "daos" })
export class DaoEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  contractAddress: string;

  @Column()
  organization: string;

  @Column()
  nftAddress: string;

  @Column({
    nullable: true,
  })
  description: string | null;

  @ManyToOne(() => UserEntity, (user) => user.daos)
  owner: UserEntity;

  @ManyToOne(() => ChainEntity, (chain) => chain.daos)
  chain: ChainEntity;

  @OneToMany(() => DaoExtraLinkEntity, (daoExtraLink) => daoExtraLink.dao)
  extraLinks: DaoExtraLinkEntity[];
}
