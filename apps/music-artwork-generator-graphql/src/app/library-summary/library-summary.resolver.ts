import { Args, Query, Resolver } from '@nestjs/graphql';
import { LibrarySummary } from './library-summary.types';
import { LibrarySummaryService } from './library-summary.service';
import { LibrarySummaryDto } from '@music/api-interfaces';

@Resolver(() => LibrarySummary)
export class LibrarySummaryResolver {
  constructor(private librarySummaryService: LibrarySummaryService) {}

  @Query(() => LibrarySummary)
  async selectOne_librarySummary(@Args('username', { type: () => String }) username: string): Promise<LibrarySummaryDto> {
    return this.librarySummaryService.getLibrarySummary(username);
  }
}
