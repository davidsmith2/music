import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from '@music/api-interfaces';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums(): Promise<Array<AlbumDto>> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string): Promise<AlbumDto> {
    return await this.albumService.getAlbum(id);
  }

  @Put(':id')
  async updateAlbumCover(
    @Param('id') _id: string,
    @Body() album: Partial<AlbumDto>
  ): Promise<Partial<AlbumDto>> {
    return await this.albumService.updateAlbumCover(album);
  }
}
