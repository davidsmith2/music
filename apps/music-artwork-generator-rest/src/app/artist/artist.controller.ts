import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from '@davidsmith/api-interfaces';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  async getArtist(@Param('id') id: string): Promise<ArtistDto> {
    return await this.artistService.getArtist(id);
  }

}
