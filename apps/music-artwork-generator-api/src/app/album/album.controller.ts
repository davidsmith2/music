import { Body, Controller, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from '@davidsmith/api-interfaces';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Put()
  saveAlbum(@Body() album: Album) {
    return this.albumService.saveAlbum(album);
  }

}
