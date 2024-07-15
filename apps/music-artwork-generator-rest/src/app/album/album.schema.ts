import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Album extends Document {
  @Prop()
  title: string;

  @Prop()
  cover: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Song' }] })
  songs: MongooseSchema.Types.ObjectId[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
