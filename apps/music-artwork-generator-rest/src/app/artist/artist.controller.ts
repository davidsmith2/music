import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from '@davidsmith/api-interfaces';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getArtists(): Array<ArtistDto> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string): ArtistDto {
    return this.artistService.getArtist(id);
  }

}
