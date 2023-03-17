import { ApiProperty } from "@nestjs/swagger";
import { DaoDto } from "./dao.dto";

export class GetDaosDto {
  @ApiProperty({
    type: [DaoDto],
  })
  data: DaoDto[];

  @ApiProperty()
  count: number;
}
