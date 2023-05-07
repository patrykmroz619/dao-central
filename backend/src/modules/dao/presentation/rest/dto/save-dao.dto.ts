import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEthereumAddress, IsInt, IsString } from "class-validator";

import { DaoExtraLinkDto } from "./dao-extra-link.dto";

export class SaveDaoDto {
  @IsInt()
  @ApiProperty()
  chainId: number;

  @IsEthereumAddress()
  @ApiProperty()
  contractAddress: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    type: [DaoExtraLinkDto],
  })
  @IsArray()
  extraLinks: DaoExtraLinkDto[];
}
