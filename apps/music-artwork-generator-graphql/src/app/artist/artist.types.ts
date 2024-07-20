import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Album } from "../album/album.types";
import { AlbumDto } from "@davidsmith/api-interfaces";

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;
  
  @Field()
  name: string;

  @Field(type => [Album], {nullable: true})
  albums: Array<AlbumDto>;

}
