import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from '@music/api-interfaces';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get albums' })
  @ApiResponse({ status: 201, description: 'Successful request.', type: [AlbumDto] })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getAlbums(): Promise<Array<AlbumDto>> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album' })
  @ApiParam({ name: 'id', description: 'The ID of the album' })
  @ApiResponse({ status: 201, description: 'Successful request.', type: AlbumDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getAlbum(@Param('id') id: string): Promise<AlbumDto> {
    return await this.albumService.getAlbum(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album cover' })
  @ApiParam({ name: 'id', description: 'The ID of the album' })
  @ApiBody({ type: AlbumDto })
  @ApiResponse({ status: 201, description: 'Successful request.', type: AlbumDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async updateAlbumCover(
    @Param('id') _id: string,
    @Body() album: Partial<AlbumDto>
  ): Promise<Partial<AlbumDto>> {
    return await this.albumService.updateAlbumCover(album);
  }
}
