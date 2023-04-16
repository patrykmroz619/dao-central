import { Inject, Injectable } from "@nestjs/common";
import {
  JwtTokensRepositoryPort,
  JwtTokensRepositoryPortToken,
} from "../ports/jwt-tokens.repository.port";

@Injectable()
export class RefreshSessionService {
  constructor(
    @Inject(JwtTokensRepositoryPortToken)
    private jwtTokensRepositoryPort: JwtTokensRepositoryPort,
  ) {}

  public async refreshUserSession(userId: string) {
    const jwtTokens = await this.jwtTokensRepositoryPort.createJWTTokensForUser(
      userId,
    );
    return jwtTokens;
  }
}
