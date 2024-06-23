import { Field, ObjectType } from "@nestjs/graphql";
import { SongType } from "../song/song.types";

@ObjectType()
export class AlbumType {
  @Field(() => String)
  id: string;
  
  @Field()
  artist: string;

  @Field()
  title: string;

  @Field({nullable: true})
  cover: string;

  @Field(type => [String], {nullable: true})
  songIds: Array<string>;

  @Field(type => [SongType], {nullable: true})
  songs: Array<SongType>;

}
