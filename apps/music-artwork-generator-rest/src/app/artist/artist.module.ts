import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artist.schema';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }])],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}