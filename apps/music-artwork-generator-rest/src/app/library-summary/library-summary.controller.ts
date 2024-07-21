import { LibrarySummaryDto } from '@music/api-interfaces';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LibrarySummaryService } from './library-summary.service';

@Controller('library-summary')
@ApiTags('LibrarySummary')
export class LibrarySummaryController {

  constructor(private readonly librarySummaryService: LibrarySummaryService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get library summary' })
  @ApiParam({ name: 'id', description: 'The ID of the library' })
  @ApiResponse({ status: 201, description: 'Successful request.', type: LibrarySummaryDto })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getLibrarySummaries(@Param('id') id: string): Promise<LibrarySummaryDto> {
    return await this.librarySummaryService.getLibrarySummary();
  }

}
