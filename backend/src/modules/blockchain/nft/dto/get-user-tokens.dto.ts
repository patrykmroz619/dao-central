import { ApiProperty } from "@nestjs/swagger";
import { UserTokenDto } from "./user-token.dto";

export class GetUserTokensDto {
  @ApiProperty({
    type: [UserTokenDto],
  })
  tokens: UserTokenDto[];
}
