import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ArtistType } from '../artist/artist.types';

@ObjectType()
export class LibraryType {
  @Field(() => String)
  id: string;

  @Field(type => [String], {nullable: true})
  artistIds: Array<string>;

  @Field(type => [ArtistType], {nullable: true})
  artists: Array<ArtistType>;

}
