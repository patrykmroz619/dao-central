import { ApiProperty } from "@nestjs/swagger";

export class UserTokenDto {
  @ApiProperty()
  nftId: number;

  @ApiProperty()
  collectionAddress: string;

  @ApiProperty()
  nftName: string;

  @ApiProperty()
  nftSymbol: string;
}
