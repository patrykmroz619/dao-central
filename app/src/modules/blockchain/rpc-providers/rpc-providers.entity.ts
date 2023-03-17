import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { NODE_ENV } from "src/constants";
import { ChainEntity } from "../chains/chains.entity";
import { RPCProviderType } from "./rpc-providers.type";

@Entity({ name: "rpc_providers" })
export class RpcProviderEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  url: string;

  @Column(
    process.env.NODE_ENV !== NODE_ENV.TEST
      ? {
          type: "enum",
          enum: RPCProviderType,
        }
      : undefined,
  )
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

  @ManyToOne(() => ChainEntity, (chain: ChainEntity) => chain.rpcProviders)
  chain: ChainEntity;
}
