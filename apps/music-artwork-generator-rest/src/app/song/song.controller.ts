import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  
  @Get()
  getSongs() {
    return this.songService.getSongs();
  }
}
