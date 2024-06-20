import { Song } from "../song/song.interface";

export interface Album {
  id: string;
  artist: string;
  title: string;
  songIds: Array<string>;
  songs: Array<Song>;
  cover?: string;
}
