import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class SaveChainDto {
  @IsInt()
  @ApiProperty()
  chainId: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  nativeCurrency: string;
}
