import { ApiProperty } from '@nestjs/swagger';

export class BodyAvailableDto {
  @ApiProperty()
  Green?: [string, string, string, string, string];

  @ApiProperty()
  Brown?: [[string], [string], [string], [string], [string]];

  @ApiProperty()
  Gray?: string[];
}
