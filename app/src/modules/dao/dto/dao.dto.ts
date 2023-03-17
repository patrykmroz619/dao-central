import { ApiProperty } from "@nestjs/swagger";

export class DaoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  organization: string;

  @ApiProperty()
  contractAddress: string;

  @ApiProperty()
  nftAddress: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  chainId: number;

  @ApiProperty()
  chainName: string;
}
