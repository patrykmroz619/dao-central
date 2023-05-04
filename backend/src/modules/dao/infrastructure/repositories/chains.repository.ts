import { Injectable } from "@nestjs/common";
import { ChainsService } from "src/modules/blockchain/chains/chains.service";
import { ChainsRepositoryPort } from "../../domain/ports/chains-repository.port";

@Injectable()
export class ChainsRepository implements ChainsRepositoryPort {
  constructor(private chainsService: ChainsService) {}

  public async getChainIds(): Promise<number[]> {
    const { chains } = await this.chainsService.getChains();

    return chains.map((chain) => chain.chainId);
  }
}
