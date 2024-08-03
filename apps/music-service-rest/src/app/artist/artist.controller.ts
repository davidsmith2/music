import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from '@music/api-interfaces';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get artists' })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: ArtistDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getArtists(): Promise<ArtistDto[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist' })
  @ApiParam({ name: 'id', description: 'The ID of the artist' })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: ArtistDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getArtist(@Param('id') id: string): Promise<ArtistDto> {
    return await this.artistService.getArtist(id);
  }
}
