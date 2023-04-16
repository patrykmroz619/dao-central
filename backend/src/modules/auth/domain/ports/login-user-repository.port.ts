type UserId = string;

export const LoginUserRepositoryPortToken =
  "JWT_LOGIN_USER_REPOSITORY_PORT_TOKEN";

export interface LoginUserRepositoryPort {
  findOrCreate(walletAddress: string): Promise<UserId>;
}
