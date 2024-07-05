import { SongDto } from "../song/song.dto";

export interface AlbumDto {
  id: string;
  artist: string;
  title: string;
  songs: Array<SongDto>;
  cover?: string;
}
