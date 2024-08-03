import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { SongDto } from '@music/api-interfaces';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('song')
@ApiTags('Song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @ApiOperation({ summary: 'Create song' })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: SongDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: SongDto, description: 'The song to create' })
  createSong(@Body() song: SongDto): Promise<SongDto> {
    return this.songService.createSong(song);
  }

  @Get()
  @ApiOperation({ summary: 'Get songs' })
  @ApiResponse({
    status: 201,
    description: 'Successful request.',
    type: SongDto,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async getSongs(): Promise<Array<SongDto>> {
    return await this.songService.getSongs();
  }
}
