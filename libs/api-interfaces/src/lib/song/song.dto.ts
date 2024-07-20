export interface SongDto {
  _id: string;
  title: string;
  genre: string;
  year: number;
  duration: number;
  artist: string;
  album: string;
  artwork?: string;
}