import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryDto } from '@davidsmith/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  saveLibrary(@Body() library: LibraryDto) {
    return this.libraryService.saveLibrary(library);
  }

  @Get(':id')
  getLibrary(@Param('id') id: string) {
    return this.libraryService.getLibrary(id);
  }
}
