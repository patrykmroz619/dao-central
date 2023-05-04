import { ApiProperty } from "@nestjs/swagger";
import { DaoModel } from "src/modules/dao/domain/models/dao.model";
import { DaoDto } from "./dao.dto";

export class DaoDetailsDto extends DaoDto {
  @ApiProperty()
  description?: string;

  @ApiProperty({
    type: DaoModel["socialMediaLinks"],
  })
  socialLinks: DaoModel["socialMediaLinks"];
}
