import { Album } from "../album/album.interface";

export interface Artist {
  id: string;
  name: string;
  albumIds: Array<string>;
  albums: Array<Album>;
}
