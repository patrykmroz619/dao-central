import { Inject, Injectable } from "@nestjs/common";

import { DaoNotFoundException } from "../exceptions/dao-not-found.exception";
import { UpdateDaoForbiddenException } from "../exceptions/update-dao-forbidden.exception";
import { DaoModel } from "../models/dao.model";
import {
  DaosRepositoryPort,
  DaosRepositoryToken,
} from "../ports/daos-repository.port";

@Injectable()
export class UpdateDaoInformationService {
  constructor(
    @Inject(DaosRepositoryToken)
    private daosRepositoryPort: DaosRepositoryPort,
  ) {}

  public async update(
    daoId: number,
    userAddress: string,
    organizationDescription?: string,
    extraLinks?: DaoModel["extraLinks"],
  ) {
    const daoToUpdate = await this.daosRepositoryPort.getDaoById(daoId);

    if (!daoToUpdate) {
      throw new DaoNotFoundException();
    }

    if (daoToUpdate.ownerAddress.toLowerCase() !== userAddress.toLowerCase()) {
      throw new UpdateDaoForbiddenException();
    }

    const updatedDaoModel = await this.daosRepositoryPort.updateDaoInformation(
      daoToUpdate.id,
      organizationDescription,
      extraLinks,
    );

    return updatedDaoModel;
  }
}
