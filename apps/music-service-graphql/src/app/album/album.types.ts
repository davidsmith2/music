import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Song } from '../song/song.types';
import { SongDto } from '@music/api-interfaces';

@ObjectType()
export class Album {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  artist: string;

  @Field({ nullable: true })
  cover: string;

  @Field((type) => [Song], { nullable: true })
  songs: Array<SongDto>;
}

@InputType()
export class AlbumUpdate {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  artist: string;

  @Field()
  cover: string;
}
