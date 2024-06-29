import { Album } from "../album/album.interface";

export interface Artist {
  id: string;
  name: string;
  albums: Array<Album>;
}
