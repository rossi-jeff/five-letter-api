import { ApiProperty } from '@nestjs/swagger';

export class ResponseAvailableDto {
  @ApiProperty()
  Words?: string[];
}
