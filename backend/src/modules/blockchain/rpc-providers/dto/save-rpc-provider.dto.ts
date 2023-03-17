import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class SaveRPCProviderDto {
  @IsUrl()
  @ApiProperty()
  url: string;
}
