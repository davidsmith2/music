import { Injectable } from '@nestjs/common';
import { AlbumDto, SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './album.schema';
import { Model } from 'mongoose';
import { Song } from '../song/song.schema';
import { Library } from '../library/library.schema';
import { AppService } from '../app.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
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
    return null;
  }
}
