import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryDto, LibraryDto } from '@davidsmith/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  async saveLibrary(@Body() createlibraryDto: CreateLibraryDto): Promise<LibraryDto> {
    return await this.libraryService.saveLibrary(createlibraryDto);
  }

  @Get(':id')
  async getLibrary(@Param('id') id: string): Promise<LibraryDto> {
    return await this.libraryService.getLibrary();
  }
}
