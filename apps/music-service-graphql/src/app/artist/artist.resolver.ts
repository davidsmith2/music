import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Artist } from './artist.types';
import { ArtistService } from './artist.service';
import { ArtistDto } from '@music/api-interfaces';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private artistService: ArtistService) {}

  @Query(() => [Artist])
  async getArtists(): Promise<ArtistDto[]> {
    return this.artistService.getAll();
  }

  @Query(() => Artist)
  async getArtist(
    @Args('_id', { type: () => ID }) _id: string
  ): Promise<ArtistDto> {
    return this.artistService.getByKey(_id);
  }
}
