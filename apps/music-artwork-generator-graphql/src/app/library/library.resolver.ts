import { Args, Query, Resolver } from '@nestjs/graphql';
import { Library } from './library.types';
import { LibraryService } from './library.service';
import { LibraryDto } from '@davidsmith/api-interfaces';

@Resolver(() => Library)
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  @Query(() => Library)
  async selectOne_library(@Args('id', { type: () => String }) id: string): Promise<LibraryDto> {
    return this.libraryService.getByKey(id);
  }
}
