import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { ethers } from "ethers";

import { ERRORS } from "src/constants";
import { UserEntity } from "src/modules/users/users.entity";
import { UsersService } from "src/modules/users/users.service";
import {
  InitLoginResponseDto,
  JwtTokensResponseDto,
  LoginRequestDto,
} from "./dto";
import { InitLoginEntity } from "./init-login.entity";
import { JWTService } from "./jwt/jwt.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(InitLoginEntity)
    private initLoginRepository: Repository<InitLoginEntity>,
    private usersService: UsersService,
    private jwtService: JWTService,
    private configService: ConfigService,
  ) {}

  async initLogin(walletAddress: string): Promise<InitLoginResponseDto> {
    if (!ethers.utils.isAddress(walletAddress)) {
      throw new BadRequestException(ERRORS.auth.invalidEthAddress);
    }

    this.logger.log(`Init login with address: ${walletAddress}`);

    const code = crypto.randomBytes(32).toString("hex");

    await this.initLoginRepository.update(
      { wallet: walletAddress.toLowerCase() },
      { active: false },
    );

    await this.initLoginRepository.save({
      wallet: walletAddress.toLowerCase(),
      code,
      active: true,
    });

    return { message: this.getMessageToSign(walletAddress, code) };
  }

  async login(
    walletAddress: LoginRequestDto["walletAddress"],
    signature: LoginRequestDto["signature"],
    ip: string,
  ): Promise<JwtTokensResponseDto> {
    const signerWalletAddress = await this.verifySignature(
      walletAddress,
      signature,
    );

    let user = await this.usersService.getUser(signerWalletAddress);

    if (!user) {
      user = await this.usersService.createUser(signerWalletAddress);
    }

    this.logger.log(`User with id ${user.id} logged in`);

    await this.initLoginRepository.update(
      { wallet: walletAddress.toLowerCase() },
      { active: false },
    );
    const jwtTokens = await this.jwtService.getNewJWTTokens(user, ip);

    return jwtTokens;
  }

  async logout(user: UserEntity): Promise<void> {
    this.jwtService.removeJwtTokens(user);
    this.logger.log(`User with id ${user.id} logged out`);
  }

  async refreshToken(
    user: UserEntity,
    ip: string,
  ): Promise<JwtTokensResponseDto> {
    const jwtTokens = await this.jwtService.getNewJWTTokens(user, ip);
    this.logger.log(
      `JWT tokens have been refreshed for user with id ${user.id}`,
    );

    return jwtTokens;
  }

  private async verifySignature(
    walletAddress: string,
    signature: string,
  ): Promise<string> {
    try {
      const initLoginRecord = await this.initLoginRepository.findOne({
        where: { wallet: walletAddress.toLowerCase(), active: true },
      });

      if (!initLoginRecord) {
        throw new Error("Init login record not found");
      }

      const message = this.getMessageToSign(
        initLoginRecord.wallet,
        initLoginRecord.code,
      );

      const signerAddress = ethers.utils.verifyMessage(message, signature);

      if (signerAddress.toLowerCase() != walletAddress.toLowerCase()) {
        throw new Error(
          "The signer address is not the same as the user address",
        );
      }

      return signerAddress;
    } catch (e: unknown) {
      this.logger.warn(
        `Login attempt failed for wallet: ${walletAddress}, error: ${e}`,
      );
      throw new UnauthorizedException(ERRORS.auth.invalidSignature);
    }
  }

  private getMessageToSign(userWalletAddress: string, code: string): string {
    const message = `Please sign this message to log in\n\n`;

    return (
      message + ethers.utils.keccak256(userWalletAddress.toLowerCase() + code)
    );
  }
}
