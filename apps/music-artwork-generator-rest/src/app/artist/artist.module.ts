import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Library, LibrarySchema } from '../library/library.schema';
import { AppService } from '../app.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema }
    ])
  ],
  controllers: [ArtistController],
  providers: [ArtistService, AppService],
})
export class ArtistModule {}