import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsInt, IsOptional } from "class-validator";

export class GetUserTokensQueryDto {
  @ApiProperty()
  @IsInt()
  chainId: number;

  @ApiProperty({
    required: false,
  })
  @IsEthereumAddress()
  @IsOptional()
  collectionAddress?: string;
}
