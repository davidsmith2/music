import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Artist extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Album' }] })
  albums: MongooseSchema.Types.ObjectId[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
