import { Artist } from "../artist/artist.interface";

export interface Library {
  id: string;
  username: string;
  artists: Array<Artist>;
}
