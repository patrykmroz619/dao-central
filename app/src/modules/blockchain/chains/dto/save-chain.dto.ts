import { ApiProperty } from "@nestjs/swagger";

export class SaveChainDto {
  @ApiProperty()
  chainId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nativeCurrency: string;
}
