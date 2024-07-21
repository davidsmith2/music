import { Query, Resolver } from '@nestjs/graphql';
import { Song } from './song.types';
import { SongService } from './song.service';
import { SongDto } from '@music/api-interfaces';

@Resolver(() => Song)
export class SongResolver {
  constructor(private songService: SongService) {}
  
  @Query(() => [Song])
  async getSongs(): Promise<Array<SongDto>> {
    return this.songService.getAll();
  }
}
