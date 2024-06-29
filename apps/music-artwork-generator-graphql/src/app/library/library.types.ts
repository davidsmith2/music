import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ArtistType } from '../artist/artist.types';

@ObjectType()
export class LibraryType {
  @Field(() => ID)
  id: string;

  @Field(type => [ArtistType], {nullable: true})
  artists: Array<ArtistType>;

}
