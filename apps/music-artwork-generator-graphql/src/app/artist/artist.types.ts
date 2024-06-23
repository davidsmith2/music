import { Field, Int, ObjectType } from "@nestjs/graphql";
import { AlbumType } from "../album/album.types";

@ObjectType()
export class ArtistType {
  @Field(() => String)
  id: string;
  
  @Field()
  name: string;

  @Field(type => [String], {nullable: true})
  albumIds: Array<string>;

  @Field(type => [AlbumType], {nullable: true})
  albums: Array<AlbumType>;

}
