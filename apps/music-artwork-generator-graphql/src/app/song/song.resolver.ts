import { Query, Resolver } from '@nestjs/graphql';
import { Song } from './song.types';
import { SongService } from './song.service';
import { SongDto } from '@davidsmith/api-interfaces';

@Resolver(() => Song)
export class SongResolver {
  constructor(private songService: SongService) {}
  
  @Query(() => [Song])
  async selectAll_songs(): Promise<Array<SongDto>> {
    return this.songService.getAll();
  }
}
