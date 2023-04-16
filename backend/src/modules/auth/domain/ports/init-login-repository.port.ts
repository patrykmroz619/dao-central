import { InitLoginModel } from "../model/init-login.model";

export const InitLoginRepositoryPortToken = "INIT_LOGIN_REPOSITORY_PORT_TOKEN";

export interface InitLoginRepositoryPort {
  deactivateAllWalletLoginAttempts(walletAddress: string): Promise<void>;

  createNewLoginAttempt(
    walletAddress: string,
    secretCode: string,
  ): Promise<InitLoginModel>;

  getLastLoginAttempt(walletAddress: string): Promise<InitLoginModel | null>;
}
