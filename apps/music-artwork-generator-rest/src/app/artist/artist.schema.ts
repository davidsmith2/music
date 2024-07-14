import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Artist extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Album' }] })
  albums: Types.ObjectId[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
