import { SongDto } from "../song/song.dto";

export class AlbumDto {
  _id: string;
  title: string;
  songs: Array<SongDto>;
  cover?: string;
  artist: string;
  album: string;
}
