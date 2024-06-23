import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { LibraryType } from './library.types';
import { LibraryService } from './library.service';

@Resolver(() => LibraryType)
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  @Query(() => LibraryType)
  async selectOne_library(@Args('id', { type: () => Int }) id: number): Promise<LibraryType> {
    return this.libraryService.getByKey(id);
  }
}
