import { ApiProperty } from "@nestjs/swagger";
import { IsEthereumAddress, IsInt } from "class-validator";

export class SaveDaoDto {
  @IsInt()
  @ApiProperty()
  chainId: number;

  @IsEthereumAddress()
  @ApiProperty()
  contractAddress: string;
}
