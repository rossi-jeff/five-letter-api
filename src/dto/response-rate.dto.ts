import { ApiProperty } from '@nestjs/swagger';

export enum Rating {
  Green = 'Green',
  Brown = 'Brown',
  Gray = 'Gray',
}

export class ResponseRateDto {
  @ApiProperty()
  Guess: string;

  @ApiProperty({ enum: Rating, type: [Rating] })
  Ratings: Rating[];
}
