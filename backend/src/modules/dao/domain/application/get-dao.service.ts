import { Inject, Injectable } from "@nestjs/common";
import { PaginateQuery } from "nestjs-paginate";
import { DaoNotFoundException } from "../exceptions/dao-not-found.exception";
import {
  DaosRepositoryPort,
  DaosRepositoryToken,
} from "../ports/daos-repository.port";

@Injectable()
export class GetDaoService {
  constructor(
    @Inject(DaosRepositoryToken)
    private daosRepositoryPort: DaosRepositoryPort,
  ) {}

  public getDaoById(daoId: number) {
    const dao = this.daosRepositoryPort.getDaoById(daoId);

    if (!dao) {
      throw new DaoNotFoundException();
    }

    return dao;
  }

  public async paginateDaos(query: PaginateQuery) {
    const { count, data } = await this.daosRepositoryPort.getPaginatedDaoData(
      query,
    );

    return {
      count,
      daos: data,
    };
  }
}
