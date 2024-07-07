import { Injectable } from '@nestjs/common';
import { AlbumDto, LibraryDto } from '@davidsmith/api-interfaces';
import { ArtistDto } from '@davidsmith/api-interfaces';
import { AppService } from '../app.service';

@Injectable()
export class AlbumService extends AppService {
  getAlbums(): Array<AlbumDto> {
    return this.readLibrary().artists.reduce((acc: AlbumDto[], artist: ArtistDto) => {
      return [...acc, ...artist.albums];
    }, []);
  }

  getAlbum(id: string): AlbumDto {
    const library: LibraryDto = this.readLibrary();
    let album: AlbumDto;
    for (let i = 0; i < library.artists.length; i++) {
      const artist = library.artists[i];
      album = artist.albums.find((album: AlbumDto) => album.id === id);
      if (album) {
        break;
      }
    }
    return album;
  }

  updateAlbum(album: AlbumDto) {
    const library: LibraryDto = this.readLibrary();
    let albumToUpdate: AlbumDto;
    for (let i = 0; i < library.artists.length; i++) {
      const artist = library.artists[i];
      albumToUpdate = artist.albums.find((a: AlbumDto) => a.id === album.id);
      if (albumToUpdate) {
        albumToUpdate.cover = album.cover;
        const albumToUpdateIndex = artist.albums.findIndex((a: AlbumDto) => a.id === album.id);
        artist.albums[albumToUpdateIndex] = albumToUpdate;
        break;
      }
    }
    this.writeLibrary(library);
    return albumToUpdate;
  }
}
