import { AlbumDto } from "../album/album.dto";

export class ArtistDto {
  _id: string;
  name: string;
  albums: Array<AlbumDto>;
}
