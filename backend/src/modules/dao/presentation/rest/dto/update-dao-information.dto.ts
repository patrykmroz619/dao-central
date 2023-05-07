import { ApiProperty } from "@nestjs/swagger";
import { DaoExtraLinkDto } from "./dao-extra-link.dto";

export class UpdateDaoInformationDto {
  @ApiProperty()
  description?: string;

  @ApiProperty({
    type: [DaoExtraLinkDto],
  })
  extraLinks?: DaoExtraLinkDto[];
}
