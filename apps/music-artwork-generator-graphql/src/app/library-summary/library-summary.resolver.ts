import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { LibrarySummary } from './library-summary.types';
import { LibrarySummaryService } from './library-summary.service';
import { LibrarySummaryDto } from '@music/api-interfaces';

@Resolver(() => LibrarySummary)
export class LibrarySummaryResolver {
  constructor(private librarySummaryService: LibrarySummaryService) {}

  @Query(() => LibrarySummary)
  async getLibrarySummary(@Args('username', { type: () => ID }) username: string): Promise<LibrarySummaryDto> {
    return this.librarySummaryService.getLibrarySummary(username);
  }
}
