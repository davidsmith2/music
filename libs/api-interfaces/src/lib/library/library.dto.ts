import { SongDto } from "../song/song.dto";

export interface LibraryDto {
  username: string;
  songs: Array<SongDto>;
}
