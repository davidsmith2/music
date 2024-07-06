import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Artist } from '../artist/artist.types';
import { ArtistDto } from '@davidsmith/api-interfaces';

@ObjectType()
export class Library {
  @Field(() => ID)
  id: string;

  @Field(type => [Artist], {nullable: true})
  artists: Array<ArtistDto>;

}
