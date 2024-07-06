import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Album, AlbumUpdate } from './album.types';
import { AlbumService } from './album.service';
import { AlbumDto } from '@davidsmith/api-interfaces';

@Resolver(() => Album)
export class AlbumResolver {
  constructor(private albumService: AlbumService) {}

  @Query(() => [Album])
  async selectAll_albums(): Promise<Array<AlbumDto>> {
    return this.albumService.getAll();
  }

  @Query(() => Album)
  async selectOne_album(@Args('id', { type: () => String }) id: string): Promise<AlbumDto> {
    return this.albumService.getByKey(id);
  }

  @Mutation(() => Album)
  async updateOne_album(@Args('album', { type: () => AlbumUpdate }) album: Album): Promise<AlbumDto> {
    return this.albumService.update(album);
  }
}
