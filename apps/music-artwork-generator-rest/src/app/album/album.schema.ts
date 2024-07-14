import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Album extends Document {
  @Prop()
  title: string;

  @Prop()
  cover: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Song' }] })
  songs: Types.ObjectId[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
