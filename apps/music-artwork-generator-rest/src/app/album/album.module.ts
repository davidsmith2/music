import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Library, LibrarySchema } from '../library/library.schema';
import { AppService } from '../app.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Library.name, schema: LibrarySchema }
    ])
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AppService],
})
export class AlbumModule {}