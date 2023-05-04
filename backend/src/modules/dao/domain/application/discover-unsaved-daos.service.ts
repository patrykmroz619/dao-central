import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  ChainsRepositoryPort,
  ChainsRepositoryPortToken,
} from "../ports/chains-repository.port";
import {
  DaoContractsRepositoryPort,
  DaoContractsRepositoryPortToken,
} from "../ports/dao-contracts-repository.port";
import {
  DaosRepositoryPort,
  DaosRepositoryToken,
} from "../ports/daos-repository.port";

@Injectable()
export class DiscoverUnsavedDaosService {
  private readonly logger = new Logger(DiscoverUnsavedDaosService.name);

  constructor(
    @Inject(ChainsRepositoryPortToken)
    private chainsRepositoryPort: ChainsRepositoryPort,
    @Inject(DaoContractsRepositoryPortToken)
    private daoContractsRepositoryPort: DaoContractsRepositoryPort,
    @Inject(DaosRepositoryToken)
    private daosRepositoryPort: DaosRepositoryPort,
  ) {}

  public async discoverDaos() {
    this.logger.log("Discovering unsaved DAOs started");
    const chainIds = await this.chainsRepositoryPort.getChainIds();

    for (const chainId of chainIds) {
      this.logger.log(`Discovering on the chain with id ${chainId}...`);
      const deployedDaoContractsCount =
        await this.daoContractsRepositoryPort.getDeployedContractsCount(
          chainId,
        );

      const storedDaos = await this.daosRepositoryPort.getDaosByChainId(
        chainId,
      );

      const storedDaosCount = storedDaos.length;

      if (storedDaosCount < deployedDaoContractsCount) {
        let numberOfMissingDaos = deployedDaoContractsCount - storedDaosCount;

        for (
          let contractIndex = deployedDaoContractsCount - 1;
          contractIndex >= 0;
          contractIndex--
        ) {
          const daoContractAddress =
            await this.daoContractsRepositoryPort.getContractAddressByIndex(
              chainId,
              contractIndex,
            );

          const isDaoAlreadyStored = storedDaos.some(
            (storedDao) =>
              storedDao.contractAddress.toLowerCase() ===
              daoContractAddress.toLowerCase(),
          );

          if (!isDaoAlreadyStored) {
            const { organizationName, ownerAddress, tokenAddress } =
              await this.daoContractsRepositoryPort.getContractDataByChainIdAndAddress(
                chainId,
                daoContractAddress,
              );

            this.logger.log(
              `New DAO contract detected (address: ${daoContractAddress}, name: ${organizationName}, owner: ${ownerAddress}`,
            );

            await this.daosRepositoryPort.saveDao({
              chainId,
              contractAddress: daoContractAddress,
              ownerAddress,
              organizationName,
              tokenAddress,
            });

            numberOfMissingDaos--;
          }

          if (numberOfMissingDaos === 0) {
            break;
          }
        }
      } else {
        this.logger.log("No new DAO contracts found");
      }
    }
  }
}
