import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GetMovieUrlService } from './get-movie-url.service';
import { GetMovieUrlController } from './get-movie-url.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [GetMovieUrlController],
  providers: [GetMovieUrlService],
})
export class GetMovieUrlModule {}
