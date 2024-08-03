import { Body, Controller, Post } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryDto } from '@music/api-interfaces';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('library')
@ApiTags('Library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create library' })
  @ApiBody({ type: LibraryDto })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: LibraryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async saveLibrary(@Body() libraryDto: LibraryDto): Promise<LibraryDto> {
    return await this.libraryService.saveLibrary(libraryDto);
  }
}
