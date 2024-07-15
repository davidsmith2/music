import { Injectable } from '@nestjs/common';
import { AlbumDto, SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.schema';
import { Model } from 'mongoose';
import { Song } from '../song/song.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  async getAlbums(): Promise<Array<AlbumDto>> {
    const albums: Album[] = await this.albumModel.find().populate('songs').exec();
    const albumDtos: AlbumDto[] = await Promise.all(albums.map(async (album) => {
      const songs: Song[] = await this.songModel.find({ _id: { $in: album.songs } }).exec();
      const songDtos: SongDto[] = await Promise.all(songs.map(async (song) => {
        return {
          id: song._id as string,
          title: song.title,
          genre: song.genre,
          year: song.year,
          duration: song.duration,
          album: album.title
        } as SongDto;
      }));
      return {
        id: album._id as string,
        title: album.title,
        songs: songDtos
      } as AlbumDto;
    }));
    return albumDtos;
  }

  async getAlbum(id: string): Promise<AlbumDto> {
    const album: Album = await this.albumModel.findById(id).populate('songs').exec();
    const songs: Song[] = await this.songModel.find({ _id: { $in: album.songs } }).exec();
    const songDtos: SongDto[] = await Promise.all(songs.map(async (song) => {
      return {
        id: song._id as string,
        title: song.title,
        genre: song.genre,
        year: song.year,
        duration: song.duration,
        album: album.title
      } as SongDto;
    }));
    return {
      id: album._id as string,
      title: album.title,
      cover: album.cover,
      songs: songDtos
    } as AlbumDto;
  }

  async updateAlbumCover(albumDto: Partial<AlbumDto>): Promise<Partial<AlbumDto>> {
    const album: Album = await this.albumModel.findByIdAndUpdate(albumDto.id, { cover: albumDto.cover }, { new: true }).exec();
    return {
      id: album._id as string,
      cover: album.cover
    };
  }
}
