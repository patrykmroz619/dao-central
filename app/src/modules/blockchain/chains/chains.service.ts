import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ERRORS } from "src/constants";
import { ChainEntity } from "./chains.entity";
import { ChainDto, GetChainsDto, SaveChainDto } from "./dto";

@Injectable()
export class ChainsService {
  constructor(
    @InjectRepository(ChainEntity)
    private chainsRepository: Repository<ChainEntity>,
  ) {}

  public async saveChain(saveChainDto: SaveChainDto): Promise<ChainDto> {
    const chainWithTheSameId = await this.chainsRepository.findOneBy({
      chainId: saveChainDto.chainId,
    });

    if (chainWithTheSameId) {
      throw new BadRequestException(ERRORS.chains.chainAlreadyExists);
    }

    const savedChain = await this.chainsRepository.save(saveChainDto);

    const { id, chainId, name, nativeCurrency } = savedChain;

    return { id, chainId, name, nativeCurrency };
  }

  public async getChains(): Promise<GetChainsDto> {
    const chainEntities = await this.chainsRepository.find();

    const chains: ChainDto[] = chainEntities.map((chain) => ({
      id: chain.id,
      chainId: chain.chainId,
      name: chain.name,
      nativeCurrency: chain.nativeCurrency,
    }));

    return { chains };
  }

  public async getChainByChainId(
    chainId: ChainEntity["chainId"],
  ): Promise<ChainEntity | null> {
    return this.chainsRepository.findOne({ where: { chainId } });
  }
}
