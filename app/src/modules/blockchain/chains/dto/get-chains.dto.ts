import { ApiProperty } from "@nestjs/swagger";
import { ChainDto } from "./chain.dto";

export class GetChainsDto {
  @ApiProperty({
    type: [ChainDto],
  })
  chains: ChainDto[];
}
