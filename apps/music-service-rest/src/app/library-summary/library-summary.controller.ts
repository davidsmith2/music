import { LibrarySummaryDto } from '@music/api-interfaces';
import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LibrarySummaryService } from './library-summary.service';

@Controller('library-summary')
@ApiTags('LibrarySummary')
export class LibrarySummaryController {
  constructor(private readonly librarySummaryService: LibrarySummaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get library summary' })
  @ApiQuery({
    name: 'username',
    description: "The username of the library's owner",
  })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: LibrarySummaryDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getLibrarySummary(
    @Query('username') username: string
  ): Promise<LibrarySummaryDto> {
    return await this.librarySummaryService.getLibrarySummary(username);
  }
}
