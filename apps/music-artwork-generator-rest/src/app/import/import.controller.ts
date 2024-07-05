import { Body, Controller, Post } from '@nestjs/common';
import { LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}
  
  @Post()
  importSongs(@Body() songs: Array<SongDto>): LibraryDto {
    const library = this.importService.importSongs(songs);
    return library;
  }
  
}
