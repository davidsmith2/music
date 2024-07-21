import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LibrarySummary {
  @Field(() => ID)
  username: string;

  @Field()
  songs: number;

  @Field()
  albums: number;

  @Field()
  artists: number;

}
