import { ApiProperty } from "@nestjs/swagger";

export class InitLoginResponseDto {
  @ApiProperty({
    type: String,
    description: "The message to sign by user's wallet",
  })
  message: string;
}
