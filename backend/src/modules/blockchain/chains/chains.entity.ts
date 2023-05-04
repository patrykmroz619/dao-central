import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { DaoEntity } from "src/modules/dao/infrastructure/entities/dao.entity";
import { RpcProviderEntity } from "../rpc-providers/rpc-providers.entity";

@Entity({ name: "chains" })
export class ChainEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  chainId: number;

  @Column()
  name: string;

  @Column()
  nativeCurrency: string;

  @OneToMany(() => RpcProviderEntity, (rpcProvider) => rpcProvider.chain)
  rpcProviders: RpcProviderEntity[];

  @OneToMany(() => DaoEntity, (dao) => dao.chain)
  daos: DaoEntity[];
}
