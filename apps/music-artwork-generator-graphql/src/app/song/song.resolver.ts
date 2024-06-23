import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { SongType } from './song.types';
import { SongService } from './song.service';

@Resolver(() => SongType)
export class SongResolver {
  constructor(private songService: SongService) {}
  
  @Query(() => [SongType])
  async selectAll_songs(): Promise<Array<SongType>> {
    return this.songService.getAll();
  }
}
