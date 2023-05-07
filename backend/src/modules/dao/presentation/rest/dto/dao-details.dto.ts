import { ApiProperty } from "@nestjs/swagger";

import { DaoExtraLinkDto } from "./dao-extra-link.dto";
import { DaoDto } from "./dao.dto";

export class DaoDetailsDto extends DaoDto {
  @ApiProperty()
  description?: string;

  @ApiProperty({
    type: [DaoExtraLinkDto],
  })
  extraLinks?: DaoExtraLinkDto[];
}
