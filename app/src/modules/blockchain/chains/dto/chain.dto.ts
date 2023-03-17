import { ApiProperty } from "@nestjs/swagger";

export class ChainDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  chainId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nativeCurrency: string;
}
