import { Artist } from "../artist/artist.interface";

export interface Library {
  id: number;
  artistIds: Array<string>;
  artists: Array<Artist>;
}
