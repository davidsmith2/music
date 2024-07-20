import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { AlbumDto, ArtistDto, LibraryDto, SongDto } from '@music/api-interfaces';
import { Song } from './song/song.schema';
import { Types } from 'mongoose';

export class AppService {
  private filepath = join(__dirname, '../../../', 'uploads', 'Library.json');

  readLibrary(): LibraryDto {
    return JSON.parse(readFileSync(this.filepath, 'utf8'));
  }

  writeLibrary(library: LibraryDto): void {
    writeFileSync(this.filepath, JSON.stringify(library), 'utf8');
  }

  getArtistDtos(songs: Song[]): ArtistDto[] {
    return songs.reduce((acc: ArtistDto[], song: Song) => {
      if (!acc.find(artistDto => artistDto.name === song.artist)) {
        acc.push({
          _id: new Types.ObjectId().toString(),
          name: song.artist,
          albums: []
        });
      }
      return acc;
    }, []);
  }

  /*
  getAlbumDtos(songs: Song[], artistName?: string): AlbumDto[] {
    return songs.filter((song: Song) => {
      return artistName ? song.artist === artistName : true;
    }).reduce((acc: AlbumDto[], song: Song) => {
      if (!acc.find(albumDto => albumDto.title === song.album)) {
        acc.push({
          id: new Types.ObjectId().toString(),
          title: song.album,
          songs: this.getSongDtos(songs, song.album, artistName),
          artist: song.artist,
          cover: song.artwork
        } as AlbumDto);
      }
      return acc;
    }, []);
  }

  getSongDtos(songs: Song[], albumTitle: string, artistName?: string): SongDto[] {
    return songs.filter((song: Song) => {
      if (artistName) {
        return song.artist === artistName && song.album === albumTitle;
      } else {
        return song.album === albumTitle;
      }

    }).reduce((acc: SongDto[], song: Song) => {
      if (!acc.find(songDto => songDto.title === song.title)) {
        acc.push({
          id: song._id as string,
          title: song.title,
          genre: song.genre,
          year: song.year,
          duration: song.duration,
          artist: song.artist,
          album: song.album
        });
      }
      return acc;
    }, []);
  }
  */

}
