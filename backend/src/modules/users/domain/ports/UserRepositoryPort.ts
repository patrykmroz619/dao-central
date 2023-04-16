import { UserModel } from "../models/UserModel";

export interface UserRepositoryPort {
  create(walletAddress: string): Promise<UserModel>;

  findByWalletAddress(walletAddress: string): Promise<UserModel>;
}
