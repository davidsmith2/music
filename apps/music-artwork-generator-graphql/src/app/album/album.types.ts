import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { Song } from "../song/song.types";
import { SongDto } from "@davidsmith/api-interfaces";

@ObjectType()
export class Album {
  @Field(() => ID)
  id: string;
  
  @Field({nullable: true})
  artist: string;

  @Field({nullable: true})
  title: string;

  @Field({nullable: true})
  cover: string;

  @Field(type => [Song], {nullable: true})
  songs: Array<SongDto>;

}

@InputType()
export class AlbumUpdate {
  @Field(() => String)
  id: string;

  @Field()
  cover: string;

}
