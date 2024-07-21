import { ApiProperty } from "@nestjs/swagger";
import { SongDto } from "../song/song.dto";

export class AlbumDto {
  @ApiProperty({
    example: 'from the cliFfs',
    description: 'The ID of the album'
  })
  _id: string;
  @ApiProperty({
    example: 'from the cliFfs',
    description: 'The title of the album'
  })
  title: string;
  @ApiProperty({
    example: [
      {
        _id: '669a5277a8664b895314d707',
        title: 'Cats Eyes',
        genre: 'Rock',
        year: 2000,
        duration: 180,
        artist: 'Artist 1',
        album: 'from the cliFfs',
        artwork: '<url>'
      },
    ],
    description: 'The songs that belong to the album'
  })
  songs: Array<SongDto>;
  @ApiProperty({
    example: '<url>',
    description: 'URL to the album cover'
  })
  cover?: string;
  @ApiProperty({
    example: 'Guillemots',
    description: 'The name of the album\'s artist'
  })
  artist: string;
}
