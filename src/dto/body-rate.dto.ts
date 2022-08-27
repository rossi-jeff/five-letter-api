import { ApiProperty } from '@nestjs/swagger';

export class BodyRateDto {
  @ApiProperty()
  Guess: string;

  @ApiProperty()
  Index: number;
}
