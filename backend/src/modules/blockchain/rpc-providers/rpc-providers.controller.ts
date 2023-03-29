import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AdminApiKeyGuard } from "src/guards";
import { GetRPCProvidersDocs, SaveRPCProviderDocs } from "./docs";
import { RPCProviderDto, SaveRPCProviderDto } from "./dto";
import { RpcProvidersService } from "./rpc-providers.service";

@ApiTags("RPC providers")
@Controller("rpc-providers")
export class RpcProvidersController {
  constructor(private rpcProvidersService: RpcProvidersService) {}

  @GetRPCProvidersDocs()
  @UseGuards(AdminApiKeyGuard)
  @Get()
  async getRPCProviders(): Promise<RPCProviderDto[]> {
    return this.rpcProvidersService.getRPCProviders();
  }

  @SaveRPCProviderDocs()
  @UseGuards(AdminApiKeyGuard)
  @Post()
  async saveRPCProvider(
    @Body() saveRPCProviderDto: SaveRPCProviderDto,
  ): Promise<RPCProviderDto> {
    return this.rpcProvidersService.saveRPCProvider(saveRPCProviderDto);
  }
}
