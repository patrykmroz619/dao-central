import { ApiProperty } from "@nestjs/swagger";

export class SaveRPCProviderDto {
  @ApiProperty()
  url: string;
}
