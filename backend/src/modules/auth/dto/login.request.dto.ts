import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsString } from "class-validator";

export class LoginRequestDto {
  @ApiProperty({
    type: String,
    required: true,
    description: "The user's wallet address",
  })
  @IsEthereumAddress()
  walletAddress: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "The signature signed by the user's wallet",
  })
  @IsString()
  signature: string;
}
