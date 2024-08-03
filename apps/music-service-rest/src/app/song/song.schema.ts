import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Song extends Document {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  year: number;

  @Prop()
  duration: number;

  @Prop()
  artist: string;

  @Prop()
  album: string;

  @Prop()
  artwork: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
