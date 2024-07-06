import { Args, Query, Resolver } from '@nestjs/graphql';
import { Artist } from './artist.types';
import { ArtistService } from './artist.service';
import { ArtistDto } from '@davidsmith/api-interfaces';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private artistService: ArtistService) {}

  @Query(() => Artist)
  async selectOne_artist(@Args('id', { type: () => String }) id: string): Promise<ArtistDto> {
    return this.artistService.getByKey(id);
  }
}
