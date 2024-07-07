import { Controller, Get } from '@nestjs/common';
import { SongService } from './song.service';
import { SongDto } from '@davidsmith/api-interfaces';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  
  @Get()
  getSongs(): Array<SongDto> {
    return this.songService.getSongs();
  }
}
