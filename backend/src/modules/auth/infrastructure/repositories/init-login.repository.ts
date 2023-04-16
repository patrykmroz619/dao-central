import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InitLoginModel } from "../../domain/model/init-login.model";
import { InitLoginRepositoryPort } from "../../domain/ports/init-login-repository.port";
import { InitLoginEntity } from "../entities/init-login.entity";

export class InitLoginRepository implements InitLoginRepositoryPort {
  constructor(
    @InjectRepository(InitLoginEntity)
    private initLoginRepository: Repository<InitLoginEntity>,
  ) {}

  public async deactivateAllWalletLoginAttempts(
    walletAddress: string,
  ): Promise<void> {
    await this.initLoginRepository.update(
      { wallet: walletAddress.toLowerCase() },
      { active: false },
    );
  }

  public async createNewLoginAttempt(
    walletAddress: string,
    secretCode: string,
  ): Promise<InitLoginModel> {
    const newInitLoginRecord = await this.initLoginRepository.save({
      wallet: walletAddress.toLowerCase(),
      code: secretCode,
      active: true,
    });

    const initLoginModel = new InitLoginModel(
      newInitLoginRecord.wallet,
      newInitLoginRecord.code,
    );

    return initLoginModel;
  }

  public async getLastLoginAttempt(
    walletAddress: string,
  ): Promise<InitLoginModel | null> {
    const initLoginRecord = await this.initLoginRepository.findOne({
      where: { wallet: walletAddress.toLowerCase(), active: true },
    });

    if (!initLoginRecord) {
      return null;
    }

    const initLoginModel = new InitLoginModel(
      initLoginRecord.wallet,
      initLoginRecord.code,
    );

    return initLoginModel;
  }
}
