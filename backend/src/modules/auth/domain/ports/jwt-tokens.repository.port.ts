import { JwtTokensModel } from "../model/jwt-tokens.model";

export const JwtTokensRepositoryPortToken = "JWT_TOKENS_REPOSITORY_PORT_TOKEN";

export interface JwtTokensRepositoryPort {
  createJWTTokensForUser(userId: string): Promise<JwtTokensModel>;

  removeJWTTokensForUser(userId: string): Promise<void>;
}
