import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto, LibraryDto } from '@davidsmith/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  saveLibrary(@Body() createlibraryDto: CreateLibraryDto) {
    return this.libraryService.saveLibrary2(createlibraryDto);
  }

  @Get(':id')
  getLibrary(@Param('id') id: string): LibraryDto {
    return this.libraryService.getLibrary();
  }
}
