import { Body, Controller, Get, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from '@davidsmith/api-interfaces';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Put()
  saveAlbum(@Body() album: Album) {
    return this.albumService.saveAlbum(album);
  }

}
