import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from '@davidsmith/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  saveLibrary(@Body() library: Library) {
    return this.libraryService.saveLibrary(library);
  }

  @Get(':id')
  getLibrary(@Param('id') id: number) {
    return this.libraryService.getLibrary(id);
  }

}
