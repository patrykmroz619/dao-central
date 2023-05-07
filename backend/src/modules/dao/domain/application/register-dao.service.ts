import { Inject, Injectable } from "@nestjs/common";
import { DaoAlreadyExistsException } from "../exceptions/dao-already-exist.exception";
import { DaoModel } from "../models/dao.model";
import {
  DaoContractsRepositoryPort,
  DaoContractsRepositoryPortToken,
} from "../ports/dao-contracts-repository.port";
import {
  DaosRepositoryPort,
  DaosRepositoryToken,
} from "../ports/daos-repository.port";

@Injectable()
export class RegisterDaoService {
  constructor(
    @Inject(DaoContractsRepositoryPortToken)
    private daoContractsRepositoryPort: DaoContractsRepositoryPort,
    @Inject(DaosRepositoryToken)
    private daosRepositoryPort: DaosRepositoryPort,
  ) {}

  public async registerDao(
    chainId: number,
    contractAddress: string,
    organizationDescription?: string,
    extraLinks?: DaoModel["extraLinks"],
  ) {
    const existingDao = await this.daosRepositoryPort.getDaoByChainIdAndAddress(
      chainId,
      contractAddress,
    );

    if (existingDao) {
      throw new DaoAlreadyExistsException();
    }

    const { ownerAddress, organizationName, tokenAddress } =
      await this.daoContractsRepositoryPort.getContractDataByChainIdAndAddress(
        chainId,
        contractAddress,
      );

    const newDaoModel = await this.daosRepositoryPort.saveDao({
      chainId,
      contractAddress,
      ownerAddress,
      organizationName,
      tokenAddress,
      organizationDescription,
      extraLinks,
    });

    return newDaoModel;
  }
}
