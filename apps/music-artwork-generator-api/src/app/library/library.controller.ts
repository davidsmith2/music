import { Body, Controller, Get, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { Library } from '@davidsmith/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  saveLibrary(@Body() library: Library) {
    return this.libraryService.saveLibrary(library);
  }

  @Get()
  getLibrary() {
    return this.libraryService.getLibrary();
  }

}
