import { Query, Resolver } from '@nestjs/graphql';
import { Song } from './song.types';
import { SongService } from './song.service';

@Resolver(() => Song)
export class SongResolver {
  constructor(private songService: SongService) {}
  
  @Query(() => [Song])
  async selectAll_songs(): Promise<Array<Song>> {
    return this.songService.getAll();
  }
}
