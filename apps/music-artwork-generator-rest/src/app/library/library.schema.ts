import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Song } from '../song/song.schema';

@Schema()
export class Library extends Document {
  @Prop()
  username: string;
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Song' }] })
  songs: Song[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
