import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SaveRPCProviderDocs } from "./docs";
import { RPCProviderDto, SaveRPCProviderDto } from "./dto";
import { RpcProvidersService } from "./rpc-providers.service";

@ApiTags("RPC providers")
@Controller("rpc-providers")
export class RpcProvidersController {
  constructor(private rpcProvidersService: RpcProvidersService) {}

  @SaveRPCProviderDocs()
  @Post()
  async saveRPCProvider(
    @Body() saveRPCProviderDto: SaveRPCProviderDto,
  ): Promise<RPCProviderDto> {
    return this.rpcProvidersService.saveRPCProvider(saveRPCProviderDto);
  }
}
