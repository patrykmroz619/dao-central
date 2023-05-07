import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsUrl } from "class-validator";
import { DAO_EXTRA_LINK_TYPE } from "src/modules/dao/domain/constants/dao-extra-link.enum";

export class DaoExtraLinkDto {
  @IsEnum(DAO_EXTRA_LINK_TYPE)
  @ApiProperty()
  type: DAO_EXTRA_LINK_TYPE;

  @IsUrl()
  @ApiProperty()
  url: string;
}
