import { ApiProperty } from '@nestjs/swagger';

export class ResponseRandomDto {
  @ApiProperty()
  Word?: string;

  @ApiProperty()
  Index?: number;
}
