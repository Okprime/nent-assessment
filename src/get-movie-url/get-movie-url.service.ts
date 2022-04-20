import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
const apiKey = '6afbe356413272490d0cc0d3cc9f8dc7';

@Injectable()
export class GetMovieUrlService {
  constructor(private httpService: HttpService) {}

  async getMovieTrailerUrl(id: string) {
    try {
      const movieResult = await firstValueFrom(
        await this.httpService
          .get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`,
          )
          .pipe(map((response) => response.data)),
      );
      const movieTrailerdetails = movieResult.results.find(
        (element) => element.type === 'Trailer' && element.official === true,
      );

      return {
        message: 'You can watch the trailer with this link below',
        'trailer url': `https://www.youtube.com/watch?v=${movieTrailerdetails.key}`,
      };
    } catch (error) {}
  }

  async getMovieMetaData(movieName: string) {
    try {
      const result = await firstValueFrom(
        await this.httpService
          .get(`https://content.viaplay.se/pc-se/film/${movieName}`, {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
          })
          .pipe(map((response) => response.data)),
      );

      const path =
        result._embedded['viaplay:blocks'][0]._embedded['viaplay:product']
          .content.imdb;
      return this.getMovieTrailerUrl(path.id);
    } catch (error) {
      throw new NotFoundException('Movie not found');
    }
  }
}
