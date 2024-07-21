import { LibrarySummaryDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class LibrarySummaryService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getLibrarySummary(): Promise<LibrarySummaryDto> {
    const librarySummariesView: Model<any> = this.connection.model('LibrarySummaries', new Schema({}, {strict: false}), 'librarySummariesView');
    const librarySummaries: LibrarySummaryDto[] = await librarySummariesView.find({}).exec().catch(err => console.error(err)) as LibrarySummaryDto[];
    return librarySummaries[0];
  }
}
