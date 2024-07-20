import { Args, Query, Resolver } from '@nestjs/graphql';
import { LibrarySummary } from './library.types';
import { LibraryService } from './library.service';
import { LibraryDto, LibrarySummaryDto } from '@davidsmith/api-interfaces';

@Resolver(() => LibrarySummary)
export class LibraryResolver {
  constructor(private libraryService: LibraryService) {}

  @Query(() => LibrarySummary)
  async selectOne_library(@Args('id', { type: () => String }) id: string): Promise<LibrarySummaryDto> {
    return this.libraryService.getLibrarySummary(id);
  }
}
