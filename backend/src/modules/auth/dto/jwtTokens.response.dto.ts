import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { JWTTokens } from "../jwt/jwt.interfaces";

export class JwtTokensResponseDto implements JWTTokens {
  @ApiProperty({
    type: String,
    description: "JWT access token",
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: Date,
    description: "Date of access token expiration",
  })
  accessTokenExpiry: Date;

  @ApiProperty({
    type: String,
    description: "JWT refresh token",
  })
  @IsString()
  refreshToken: string;
}
