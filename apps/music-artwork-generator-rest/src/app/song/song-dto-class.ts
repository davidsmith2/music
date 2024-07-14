import { SongDto } from "@davidsmith/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class SongDtoClass implements SongDto {
    @ApiProperty({ example: 'da11964f', description: 'The ID of the song' })
    id: string;
    @ApiProperty({ example: 'Cats Eyes', description: 'The title of the song' })
    title: string;
    @ApiProperty({ example: 'Guillemots', description: 'The name of the song\'s artist' })
    artist: string;
    @ApiProperty({ example: 'from the cliFfs', description: 'The name of the album to which the song belongs' })
    album: string;
    @ApiProperty({ example: 'Alternative & Punk', description: 'The genre of the song' })
    genre: string;
    @ApiProperty({ example: 2006, description: 'The year the song was released' })
    year: number;
    @ApiProperty({ example: 2400, description: 'The duration of the song' })
    duration: number;
  }
  
  