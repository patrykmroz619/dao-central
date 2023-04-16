import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  JwtTokensRepositoryPort,
  JwtTokensRepositoryPortToken,
} from "../ports/jwt-tokens.repository.port";

@Injectable()
export class LogoutService {
  private readonly logger = new Logger(LogoutService.name);

  constructor(
    @Inject(JwtTokensRepositoryPortToken)
    private jwtTokensRepositoryPort: JwtTokensRepositoryPort,
  ) {}

  public async logout(userId: string) {
    await this.jwtTokensRepositoryPort.removeJWTTokensForUser(userId);
    this.logger.log(`User with id ${userId} logged out`);
  }
}
