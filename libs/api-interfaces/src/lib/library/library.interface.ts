import { Artist } from "../artist/artist.interface";

export interface Library {
  id: string;
  username: string;
  artistIds: Array<string>;
  artists: Array<Artist>;
}
