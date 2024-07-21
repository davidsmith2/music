import { ApiProperty } from "@nestjs/swagger";

export class LibrarySummaryDto {
  @ApiProperty({
    example: 'test',
    description: 'The username of the library\'s owner'
  })
  username: string;
  @ApiProperty({
    example: 9,
    description: 'The number of songs in the library'
  })
  songs: number;
  @ApiProperty({
    example: 2,
    description: 'The number of albums in the library'
  })
  albums: number;
  @ApiProperty({
    example: 2,
    description: 'The number of artists in the library'
  })
  artists: number;
}
