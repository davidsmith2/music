import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor() {}

  @Get()
  @ApiOperation({ summary: 'Get status' })
  @ApiResponse({ status: 201, description: 'Successful request.', type: String })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  getStatus() {
    return 'OK';
  }
}
