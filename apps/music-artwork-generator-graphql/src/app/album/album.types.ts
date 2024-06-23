import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { SongType } from "../song/song.types";

@ObjectType()
export class AlbumType {
  @Field(() => String)
  id: string;
  
  @Field({nullable: true})
  artist: string;

  @Field({nullable: true})
  title: string;

  @Field({nullable: true})
  cover: string;

  @Field(type => [String], {nullable: true})
  songIds: Array<string>;

  @Field(type => [SongType], {nullable: true})
  songs: Array<SongType>;

}

@InputType()
export class AlbumUpdateType extends AlbumType { 
  @Field(() => String)
  id: string;

  @Field()
  cover: string;

}
