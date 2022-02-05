import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Body,
  Res,
  Param,
} from '@nestjs/common';
import { WordService } from './word.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseRandomDto,
  BodyAvailableDto,
  ResponseAvailableDto,
  BodyRateDto,
  ResponseRateDto,
} from '../dto';
import { Response } from 'express';

@Controller('word')
@ApiTags('Words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get('random')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRandomDto })
  async random(@Res() response: Response) {
    response.status(HttpStatus.OK).send(await this.wordService.random());
  }

  @Get(':Index')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRandomDto })
  async byIndex(@Res() response: Response, @Param('Index') Index: string) {
    response
      .status(HttpStatus.OK)
      .send(await this.wordService.byIndex(parseInt(Index)));
  }

  @Post('available')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseAvailableDto })
  async available(@Res() response: Response, @Body() data: BodyAvailableDto) {
    response.status(HttpStatus.OK).send(await this.wordService.available(data));
  }

  @Post('rate')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRateDto })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async rate(@Res() response: Response, @Body() data: BodyRateDto) {
    response.status(HttpStatus.OK).send(await this.wordService.rate(data));
  }
}
