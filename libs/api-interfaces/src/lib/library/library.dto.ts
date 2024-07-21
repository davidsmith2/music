import { ApiProperty } from "@nestjs/swagger";
import { SongDto } from "../song/song.dto";

export class LibraryDto {
  @ApiProperty({
    example: 'test',
    description: 'The username of the library\'s owner'
  })
  username: string;
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
      }
    ],
    description: 'The songs that belong to the library'
  })
  songs: Array<SongDto>;
}
