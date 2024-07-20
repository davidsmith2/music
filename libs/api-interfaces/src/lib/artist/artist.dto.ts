import { AlbumDto } from "../album/album.dto";

export interface ArtistDto {
  _id: string;
  name: string;
  albums: Array<AlbumDto>;
}
