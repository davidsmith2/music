import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SongType {
  @Field(() => ID)
  id: string;
  
  @Field()
  artist: string;

  @Field()
  title: string;

  @Field()
  album: string;

  @Field()
  duration: number;

}
