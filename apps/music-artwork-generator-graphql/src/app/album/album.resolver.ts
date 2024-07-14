import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Album, AlbumUpdate } from './album.types';
import { AlbumService } from './album.service';
import { AlbumDto } from '@davidsmith/api-interfaces';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Album)
export class AlbumResolver {
  constructor(private albumService: AlbumService) {}

  @Query(() => [Album])
  async selectAll_albums(): Promise<Array<AlbumDto>> {
    return this.albumService.getAll();
  }

  @Query(() => Album)
  async selectOne_album(@Args('id', { type: () => String }) id: string): Promise<AlbumDto> {
    return this.albumService.getByKey(id);
  }

  @Mutation(() => Album)
  async updateOne_album(@Args('album', { type: () => AlbumUpdate }) album: Album): Promise<AlbumDto> {
    const albumDto: AlbumDto = await this.albumService.update(album);
    pubSub.publish('albumUpdated', { albumUpdated: albumDto });
    return albumDto;
  }

  @Subscription(() => Album, {
    name: 'albumUpdated',
    filter: (payload, variables) => {
      console.log('@Subscription filter', payload, variables);
      return payload.albumUpdated.artist === variables.artistName;
    }
  })
  albumUpdated(@Args('artistName') artistName: String): AsyncIterator<AlbumDto> {
    console.log('@Subscription artistName', artistName)
    return pubSub.asyncIterator('albumUpdated');
  }

}