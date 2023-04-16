import { Inject, Injectable } from "@nestjs/common";

import { InvalidLoginSignatureException } from "../exceptions/invalid-login-signature.exception";
import {
  InitLoginRepositoryPort,
  InitLoginRepositoryPortToken,
} from "../ports/init-login-repository.port";
import {
  JwtTokensRepositoryPort,
  JwtTokensRepositoryPortToken,
} from "../ports/jwt-tokens.repository.port";
import {
  LoginUserRepositoryPort,
  LoginUserRepositoryPortToken,
} from "../ports/login-user-repository.port";

@Injectable()
export class WalletLoginService {
  constructor(
    @Inject(InitLoginRepositoryPortToken)
    private initLoginRepositoryPort: InitLoginRepositoryPort,
    @Inject(LoginUserRepositoryPortToken)
    private loginUserRepositoryPort: LoginUserRepositoryPort,
    @Inject(JwtTokensRepositoryPortToken)
    private jwtTokensRepositoryPort: JwtTokensRepositoryPort,
  ) {}

  public async loginByWallet(walletAddress: string, signature: string) {
    const initLoginModel =
      await this.initLoginRepositoryPort.getLastLoginAttempt(walletAddress);

    if (!initLoginModel) {
      throw new InvalidLoginSignatureException();
    }

    const isSignatureValid = initLoginModel.verifyLoginSignature(signature);

    await this.initLoginRepositoryPort.deactivateAllWalletLoginAttempts(
      walletAddress,
    );

    if (!isSignatureValid) {
      throw new InvalidLoginSignatureException();
    }

    const userId = await this.loginUserRepositoryPort.findOrCreate(
      walletAddress,
    );

    const jwtTokens = await this.jwtTokensRepositoryPort.createJWTTokensForUser(
      userId,
    );

    return jwtTokens;
  }
}
