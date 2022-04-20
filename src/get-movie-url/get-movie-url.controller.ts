import { Controller, Get, Query } from '@nestjs/common';
import { GetMovieUrlService } from './get-movie-url.service';

@Controller('get-movie-url')
export class GetMovieUrlController {
  constructor(private readonly getMovieUrlService: GetMovieUrlService) {}

  @Get()
  async getMovieTrailerUrl(@Query('movieName') movieName: string) {
    return this.getMovieUrlService.getMovieMetaData(movieName);
  }
}
