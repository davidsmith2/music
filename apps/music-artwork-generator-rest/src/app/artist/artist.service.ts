import { Injectable } from '@nestjs/common';
import { ArtistDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppService } from '../app.service';
import { Library } from '../library/library.schema';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    private appService: AppService
  ) { }

  async getArtist(name: string): Promise<ArtistDto> {
    const library: Library = await this.libraryModel.findOne({username: 'test'}).populate('songs').exec();
    const artistDtos: ArtistDto[] = this.appService.getArtistDtos(library.songs);
    return artistDtos.find(artistDto => {
      return artistDto.name === name;
    });
  }
}
