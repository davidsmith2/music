import { Artist } from "../artist/artist.interface";

export interface Library {
  id: number;
  artists: Array<Artist>;
}
