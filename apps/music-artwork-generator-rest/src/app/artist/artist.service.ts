import { Injectable } from '@nestjs/common';
import { AlbumDto, ArtistDto, SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './artist.schema';
import { Model } from 'mongoose';
import { Album } from '../album/album.schema';
import { Song } from '../song/song.schema';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  async getArtists(): Promise<Array<ArtistDto>> {
    const artists: Artist[] = await this.artistModel.find().populate('albums').exec();
    const artistDtos: ArtistDto[] = await Promise.all(artists.map(async (artist) => {
      const albums: Album[] = await this.albumModel.find({ _id: { $in: artist.albums } }).populate('songs').exec();
      const albumDtos: AlbumDto[] = await Promise.all(albums.map(async (album) => {
        const songs: Song[] = await this.songModel.find({ _id: { $in: album.songs } }).exec();
        const songDtos: SongDto[] = await Promise.all(songs.map(async (song) => {
          return {
            id: song._id as string,
            title: song.title,
            genre: song.genre,
            year: song.year,
            duration: song.duration,
            album: album.title,
            artist: artist.name
          };
        }));
        return {
          id: album._id as string,
          title: album.title,
          songs: songDtos,
          artist: artist.name
        };
      }));
      return {
        id: artist._id as string,
        name: artist.name,
        albums: albumDtos
      };
    }));
    return artistDtos;
  }

  async getArtist(id: string): Promise<ArtistDto> {
    const artist: Artist = await this.artistModel.findById(id).populate('albums').exec();
    const albums: Album[] = await this.albumModel.find({ _id: { $in: artist.albums } }).populate('songs').exec();
    const albumDtos: AlbumDto[] = await Promise.all(albums.map(async (album) => {
      const songs: Song[] = await this.songModel.find({ _id: { $in: album.songs } }).exec();
      const songDtos: SongDto[] = await Promise.all(songs.map(async (song) => {
        return {
          id: song._id as string,
          title: song.title,
          genre: song.genre,
          year: song.year,
          duration: song.duration,
          album: album.title,
          artist: artist.name
        };
      }));
      return {
        id: album._id as string,
        title: album.title,
        songs: songDtos,
        artist: artist.name
      };
    }));
    return {
      id: artist._id as string,
      name: artist.name,
      albums: albumDtos
    };
  }
}
