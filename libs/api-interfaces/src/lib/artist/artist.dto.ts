import { ApiProperty } from "@nestjs/swagger";
import { AlbumDto } from "../album/album.dto";

export class ArtistDto {
  @ApiProperty({
    example: 'Guillemots',
    description: 'The ID of the artist'
  })
  _id: string;
  @ApiProperty({
    example: 'Guillemots',
    description: 'The name of the artist'
  })
  name: string;
  @ApiProperty({
    example: [
      {
        _id: 'from the cliFfs',
        title: 'from the cliFfs',
        songs: [
          {
            _id: '669a5277a8664b895314d707',
            title: 'Cats Eyes',
            genre: 'Rock',
            year: 2000,
            duration: 180,
            artist: 'Artist 1',
            album: 'from the cliFfs',
            artwork: '<url>'
          }
        ],
        cover: '<url>',
        artist: 'Guillemots'
      }
    ],
    description: 'The albums that belong to the artist'
  })
  albums: Array<AlbumDto>;
}
