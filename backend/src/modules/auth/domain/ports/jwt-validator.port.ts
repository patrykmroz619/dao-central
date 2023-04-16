import { UserModel } from "src/modules/users/domain/models/user.model";

export const JwtValidatorPortToken = "JWT_VALIDATOR_PORT_TOKEN";

export interface JwtValidatorPort {
  validateAccessToken(payload: unknown): Promise<UserModel>;

  validateRefreshToken(payload: unknown): Promise<UserModel>;
}
