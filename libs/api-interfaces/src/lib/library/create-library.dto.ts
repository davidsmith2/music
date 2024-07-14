import { SongDto } from "../song/song.dto";

export interface CreateLibraryDto {
  username: string;
  songs: Array<SongDto>;
}
