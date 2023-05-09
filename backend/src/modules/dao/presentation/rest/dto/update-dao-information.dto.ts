import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

import { DaoExtraLinkDto } from "./dao-extra-link.dto";

export class UpdateDaoInformationDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: [DaoExtraLinkDto],
  })
  @IsArray()
  extraLinks?: DaoExtraLinkDto[];
}
