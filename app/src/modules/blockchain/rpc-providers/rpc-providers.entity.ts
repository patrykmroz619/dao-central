import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ChainEntity } from "../chains/chains.entity";
import { RPCProviderType } from "./rpc-providers.type";

@Entity({ name: "rpc_providers" })
export class RpcProviderEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  url: string;

  @Column({
    type: "enum",
    enum: RPCProviderType,
  })
  type: RPCProviderType;

  @Column({
    default: 0,
  })
  errorsCount: number;

  @Column({
    default: 0,
  })
  usageCount: number;

  @Column({ nullable: true })
  lastUsage: Date;

  @ManyToOne(() => ChainEntity, (chain) => chain.rpcProviders)
  chain: ChainEntity;
}
