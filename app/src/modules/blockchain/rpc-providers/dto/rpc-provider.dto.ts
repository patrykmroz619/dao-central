import { ApiProperty } from "@nestjs/swagger";
import { ChainEntity } from "../../chains/chains.entity";
import { RPCProviderType } from "../rpc-providers.type";

export class RPCProviderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty({
    enum: RPCProviderType,
  })
  type: RPCProviderType;

  @ApiProperty()
  chainId: ChainEntity["chainId"];

  @ApiProperty()
  chainName: ChainEntity["name"];
}
