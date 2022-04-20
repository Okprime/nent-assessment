import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetMovieUrlModule } from './get-movie-url/get-movie-url.module';

@Module({
  imports: [GetMovieUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
