import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Library, Song } from '@davidsmith/api-interfaces';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}
  
  @Post()
  importSongs(@Body() songs: Array<Song>): Library {
    const library = this.importService.importSongs(songs);
    return library;
  }
  
}
