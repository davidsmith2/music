import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Song {
  @Field(() => ID)
  _id: string;
  
  @Field()
  title: string;

  @Field()
  genre: string;

  @Field()
  year: number;

  @Field()
  duration: number;

  @Field()
  artist: string;

  @Field()
  album: string;

}
