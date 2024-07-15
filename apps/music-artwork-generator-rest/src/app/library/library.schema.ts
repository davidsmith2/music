import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Library extends Document {
  @Prop()
  username: string;
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Artist' }] })
  artists: MongooseSchema.Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
