import { Injectable } from '@nestjs/common';
import { ArtistDto } from '@davidsmith/api-interfaces';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class ArtistService {
  constructor(@InjectConnection() private connection: Connection) { }

  async getArtists(): Promise<ArtistDto[]> {
    const artistsView: Model<any> = this.connection.model('Artists', new Schema({_id: String, name: String}, {strict: false}), 'artistsView');
    const artists: ArtistDto[] = await artistsView.find().exec().catch(err => console.error(err)) as ArtistDto[];
    return artists;
  }

  async getArtist(name: string): Promise<ArtistDto> {
    const artistsView: Model<any> = this.connection.model('Artists', new Schema({_id: String, name: String}, {strict: false}), 'artistsView');
    const artist: ArtistDto = await artistsView.findById(name).exec().catch(err => console.error(err)) as ArtistDto;
    return artist;
  }
}
