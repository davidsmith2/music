import { Injectable } from '@nestjs/common';
import { AlbumDto, ArtistDto, CreateLibraryDto, LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import * as XXH from 'xxhashjs';
import { AppService } from '../app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './library.schema';
import { Model } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Album } from '../album/album.schema';
import { Song } from '../song/song.schema';

@Injectable()
export class LibraryService extends AppService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) {
    super();
  }

  saveLibrary(library: LibraryDto): LibraryDto {
    const libraryId: string = this.createId(library.username, 0xABCD);
    library.id = libraryId;
    library.artists = library.artists.map((artist: ArtistDto, artistIndex: number) => {
      const artistId: string = this.createId(artist.name, artistIndex);
      artist.id = artistId;
      artist.albums = artist.albums.map((album, albumIndex) => {
        const albumId: string = this.createId(album.title, Number(`${artist.id}${albumIndex}`));
        album.id = albumId;
        album.songs = album.songs.filter((song: SongDto, songIndex: number) => {
          if (!song) {
            console.log('Error reading song', album.title, songIndex + 1);
          }
          return !!song;
        }).map((song, songIndex) => {
          const songId: string = this.createId(song.title, Number(`${artist.id}${album.id}${songIndex}`));
          song.duration = Math.round(song.duration) || 0;
          song.id = songId;
          return song;
        });
        return album;
      });
      return artist;
    });
    this.writeLibrary(library);
    return this.getLibrary();
  }

  async saveLibrary2(createLibraryDto: CreateLibraryDto): Promise<CreateLibraryDto> {
    // Step 1: Create and save songs
    const songIds = await Promise.all(createLibraryDto.songs.map(async (songDto: SongDto) => {
      const song = new this.songModel({
        title: songDto.title,
        genre: songDto.genre,
        year: songDto.year,
        duration: songDto.duration
      });
      const savedSong = await song.save();
      return savedSong._id; // Collect song ID
    }));
    // Step 2: Create and save albums
    const albumTitles = createLibraryDto.songs.map(song => {
      return song.album;
    }).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const albumIds = await Promise.all(albumTitles.map(async (albumTitle: string) => {
      const album = new this.albumModel({
        title: albumTitle,
        songs: songIds
      });
      const savedAlbum = await album.save();
      return savedAlbum._id; // Collect album ID
    }));
    // Step 3: Create and save artists
    const artistNames = createLibraryDto.songs.map(song => {
      return song.artist;
    }).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    const artistIds = await Promise.all(artistNames.map(async (artistName: string) => {
      const artist = new this.artistModel({
        name: artistName,
        albums: albumIds
      });
      const savedArtist = await artist.save();
      return savedArtist._id; // Collect artist ID
    }));
    // Step 4: Assuming you have a libraryModel similar to artistModel
    const library = new this.libraryModel({
      username: createLibraryDto.username,
      artists: artistIds, // Use collected artist IDs
    });
    // Step 5: Save the Library document
    const savedLibrary = await library.save();
    // Step 4: Return the saved Library document (or its DTO)
    return createLibraryDto; // Adjust according to your needs, e.g., convert to DTO if necessary
  }

  getLibrary(): LibraryDto {
    return this.readLibrary();
  }

  private createId(input, seed): string {
    const hash = XXH.h32(input, seed.toString().padStart(6, '0')).toString(16);
    return hash;
  }
}
