import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryDto, LibrarySummaryDto } from '@music/api-interfaces';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('library')
@ApiTags('Library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create library' })
  @ApiBody({ type: LibraryDto })
  @ApiResponse({ status: 201, description: 'Successful request.', type: LibraryDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async saveLibrary(@Body() libraryDto: LibraryDto): Promise<LibraryDto> {
    return await this.libraryService.saveLibrary(libraryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get library summary' })
  @ApiParam({ name: 'id', description: 'The ID of the library' })
  @ApiResponse({ status: 201, description: 'Successful request.', type: LibrarySummaryDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getLibrarySummaries(@Param('id') id: string): Promise<LibrarySummaryDto> {
    return await this.libraryService.getLibrarySummary();
  }
}
