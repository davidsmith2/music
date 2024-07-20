import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryDto, LibrarySummaryDto } from '@music/api-interfaces';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  async saveLibrary(@Body() libraryDto: LibraryDto): Promise<LibraryDto> {
    return await this.libraryService.saveLibrary(libraryDto);
  }

  @Get(':id')
  async getLibrarySummaries(@Param('id') id: string): Promise<LibrarySummaryDto> {
    return await this.libraryService.getLibrarySummary();
  }
}
