import { ApiProperty } from "@nestjs/swagger";

export class SaveDaoResponseDto {
  @ApiProperty()
  daoId: number;
}
