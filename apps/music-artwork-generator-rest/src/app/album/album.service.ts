import { Injectable } from '@nestjs/common';
import { AlbumDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from '../library/library.schema';
import { AppService } from '../app.service';
import { Song } from '../song/song.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Song.name) private songModel: Model<Song>,
    private appService: AppService
  ) { }

  async getAlbums(): Promise<Array<AlbumDto>> {
    const library: Library = await this.libraryModel.findOne({username: 'test'}).populate('songs').exec();
    const albumDtos: AlbumDto[] = this.appService.getAlbumDtos(library.songs);
    return albumDtos;
  }

  async getAlbum(id: string): Promise<AlbumDto> {
    const library: Library = await this.libraryModel.findOne({username: 'test'}).populate('songs').exec();
    const albumDtos: AlbumDto[] = this.appService.getAlbumDtos(library.songs);
    return albumDtos.find(album => album.title === id);
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
