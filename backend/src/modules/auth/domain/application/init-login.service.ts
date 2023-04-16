import { Inject, Injectable, Logger } from "@nestjs/common";
import { ethers } from "ethers";
import * as crypto from "crypto";

import { BadEthereumAddressException } from "../exceptions/bad-ethereum-address.exception";
import {
  InitLoginRepositoryPort,
  InitLoginRepositoryPortToken,
} from "../ports/init-login-repository.port";

@Injectable()
export class InitLoginService {
  private readonly logger = new Logger(InitLoginService.name);

  constructor(
    @Inject(InitLoginRepositoryPortToken)
    private initLoginRepositoryPort: InitLoginRepositoryPort,
  ) {}

  public async initLoginByWallet(walletAddress: string) {
    if (!ethers.isAddress(walletAddress)) {
      throw new BadEthereumAddressException();
    }

    this.logger.log(`Init login with address: ${walletAddress}`);

    await this.initLoginRepositoryPort.deactivateAllWalletLoginAttempts(
      walletAddress,
    );

    const secretCode = this.generatePrivateInitLoginCode();

    const initLoginModel =
      await this.initLoginRepositoryPort.createNewLoginAttempt(
        walletAddress,
        secretCode,
      );

    const messageToSign = initLoginModel.getMessageToSign();

    return {
      message: messageToSign,
    };
  }

  private generatePrivateInitLoginCode() {
    return crypto.randomBytes(32).toString("hex");
  }
}
