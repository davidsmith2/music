import { Injectable } from '@nestjs/common';
import { AlbumDto } from '@music/api-interfaces';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Schema } from 'mongoose';
import { Song } from '../song/song.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  async getAlbums(): Promise<Array<AlbumDto>> {
    const albumsView: Model<any> = this.connection.model('Albums', new Schema({_id: String, title: String}, {strict: false}), 'albumsView');
    const albums: AlbumDto[] = await albumsView.find().exec().catch(err => console.error(err)) as AlbumDto[];
    return albums;
  }

  async getAlbum(_id: string): Promise<AlbumDto> {
    const albumsView: Model<any> = this.connection.model('Albums', new Schema({_id: String, title: String}, {strict: false}), 'albumsView');
    const album: AlbumDto = await albumsView.findById(_id).exec().catch(err => console.error(err)) as AlbumDto;
    return album;
  }

  async updateAlbumCover(albumDto: Partial<AlbumDto>): Promise<Partial<AlbumDto>> {
    const songs: Song[] = await this.songModel.find({
      artist: albumDto.artist,
      album: albumDto.title
    }).exec();
    songs.forEach(song => {
      song.artwork = albumDto.cover;
      song.save();
    });
    return albumDto;
  }
}
