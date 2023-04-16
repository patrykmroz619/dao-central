import { UserModel } from "../models/user.model";

export const UserRepositoryPortToken = "USER_REPOSITORY_TOKEN";

export interface UserRepositoryPort {
  create(walletAddress: string): Promise<UserModel>;

  findByWalletAddress(walletAddress: string): Promise<UserModel | null>;

  findById(userId: string): Promise<UserModel | null>;
}
