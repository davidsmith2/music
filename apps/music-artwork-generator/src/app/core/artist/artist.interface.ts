import { Album } from "../album/album.interface";

export interface Artist {
  name: string;
  albums: Array<Album>;
}
