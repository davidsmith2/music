import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AlbumType } from './album.types';
import { AlbumService } from './album.service';

@Resolver(() => AlbumType)
export class AlbumResolver {
  constructor(private albumService: AlbumService) {}

  @Query(() => [AlbumType])
  async selectAll_albums(): Promise<Array<AlbumType>> {
    return this.albumService.getAll();
  }

  @Query(() => AlbumType)
  async selectOne_album(@Args('id', { type: () => String }) id: string): Promise<AlbumType> {
    return this.albumService.getByKey(id);
  }
}
