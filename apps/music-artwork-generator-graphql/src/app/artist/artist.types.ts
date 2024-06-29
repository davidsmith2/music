import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AlbumType } from "../album/album.types";

@ObjectType()
export class ArtistType {
  @Field(() => ID)
  id: string;
  
  @Field()
  name: string;

  @Field(type => [AlbumType], {nullable: true})
  albums: Array<AlbumType>;

}
