import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto {
  @ApiProperty({
    type: Number,
    description: "The response code",
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: "The error message",
  })
  message: string;

  @ApiProperty({
    type: String,
    description: "The type of error",
  })
  error: string;
}
