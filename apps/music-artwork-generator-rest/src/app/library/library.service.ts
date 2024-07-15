import { Injectable } from '@nestjs/common';
import { AlbumDto, ArtistDto, CreateLibraryDto, LibraryDto, SongDto } from '@davidsmith/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Library } from './library.schema';
import { Model } from 'mongoose';
import { Artist } from '../artist/artist.schema';
import { Album } from '../album/album.schema';
import { Song } from '../song/song.schema';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ) { }

  async saveLibrary(createLibraryDto: CreateLibraryDto): Promise<LibraryDto> {
    // Step 1: Save songs
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
    // Step 2: Save albums
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
    // Step 3: Save artists
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
    // Step 4: Save library
    const library = new this.libraryModel({
      username: createLibraryDto.username,
      artists: artistIds, // Use collected artist IDs
    });
    await library.save();
    // Step 4: Return the saved Library document (or its DTO)
    return this.getLibrary();
  }

  async getLibrary(): Promise<LibraryDto> {
    const library: Library = await this.libraryModel.findOne({username: 'test'}).populate('artists').exec();
    const artists: Artist[] = await this.artistModel.find({ _id: { $in: library.artists } }).populate('albums').exec();
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
    return {
      id: library._id as string,
      username: library.username,
      artists: artistDtos
    };
  }

}
