import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Library extends Document {
  @Prop()
  username: string;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Artist' }] })
  artists: Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
