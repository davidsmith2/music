import { Controller, Get, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('artist')
  getArtists() {
    return this.appService.getArtists();
  }

  @Get('albums')
  getAlbumsByArtistName(@Query('artistName') artistName: string) {
    return this.appService.getAlbumsByArtistName(artistName);
  }
}
