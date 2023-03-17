import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    description: "The user's wallet address",
  })
  walletAddress: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;
}
