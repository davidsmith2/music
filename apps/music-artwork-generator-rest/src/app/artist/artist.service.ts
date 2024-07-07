import { Injectable } from '@nestjs/common';
import { ArtistDto } from '@davidsmith/api-interfaces';
import { AppService } from '../app.service';

@Injectable()
export class ArtistService extends AppService {
  getArtists(): Array<ArtistDto> {
    return this.readLibrary().artists;
  }

  getArtist(id: string): ArtistDto {
    return this.readLibrary().artists.find((artist: ArtistDto) => artist.id === id);
  }
}
