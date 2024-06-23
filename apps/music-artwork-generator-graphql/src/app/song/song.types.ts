import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SongType {
  @Field(() => String)
  id: string;
  
  @Field()
  artist: string;

  @Field()
  title: string;

  @Field()
  album: string;

}
