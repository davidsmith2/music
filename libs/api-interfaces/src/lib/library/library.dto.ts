import { SongDto } from "../song/song.dto";

export class LibraryDto {
  username: string;
  songs: Array<SongDto>;
}
