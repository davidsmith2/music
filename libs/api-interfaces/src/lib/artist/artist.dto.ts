import { AlbumDto } from "../album/album.dto";

export interface ArtistDto {
  id: string;
  name: string;
  albums: Array<AlbumDto>;
}
