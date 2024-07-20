import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { SongDto } from '@music/api-interfaces';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SongDtoClass } from './song-dto-class';

@Controller('song')
@ApiTags('Song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new song' })
  @ApiResponse({ status: 201, description: 'The song has been successfully created.', type: SongDtoClass })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: SongDtoClass, description: 'The song to create' })
  createSong(@Body() song: SongDto): Promise<SongDto> {
    console.log('Creating song:', song);
    return this.songService.createSong(song);
  }
  
  @Get()
  async getSongs(): Promise<Array<SongDto>> {
    return await this.songService.getSongs();
  }
}
