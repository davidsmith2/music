import { ArtistDto } from "../artist/artist.dto";

export interface LibraryDto {
  id: string;
  username: string;
  artists: Array<ArtistDto>;
}
