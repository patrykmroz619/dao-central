import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsNumberString, IsOptional } from "class-validator";

export class GetUserTokensQueryDto {
  @ApiProperty()
  @IsNumberString()
  chainId: string;

  @ApiProperty({
    required: false,
  })
  @IsEthereumAddress()
  @IsOptional()
  collectionAddress?: string;
}
