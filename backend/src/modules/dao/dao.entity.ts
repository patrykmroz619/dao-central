import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChainEntity } from "../blockchain/chains/chains.entity";
import { UserEntity } from "../users/users.entity";

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

  @ManyToOne(() => UserEntity, (user) => user.daos)
  owner: UserEntity;

  @ManyToOne(() => ChainEntity, (chain) => chain.daos)
  chain: ChainEntity;
}
