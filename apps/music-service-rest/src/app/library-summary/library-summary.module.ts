import { Module } from '@nestjs/common';
import { LibrarySummaryController } from './library-summary.controller';
import { LibrarySummaryService } from './library-summary.service';

@Module({
  controllers: [LibrarySummaryController],
  providers: [LibrarySummaryService],
})
export class LibrarySummaryModule {}
