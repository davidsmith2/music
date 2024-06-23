import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ArtistType } from './artist.types';
import { ArtistService } from './artist.service';

@Resolver(() => ArtistType)
export class ArtistResolver {
  constructor(private artistService: ArtistService) {}

  @Query(() => ArtistType)
  async selectOne_artist(@Args('id', { type: () => String }) id: string): Promise<ArtistType> {
    return this.artistService.getByKey(id);
  }
}
