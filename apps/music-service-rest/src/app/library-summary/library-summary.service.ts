import { LibrarySummaryDto } from '@music/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class LibrarySummaryService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getLibrarySummary(username: string): Promise<LibrarySummaryDto> {
    const librarySummariesView: Model<any> = this.connection.model(
      'LibrarySummaries',
      new Schema({}, { strict: false }),
      'librarySummariesView'
    );
    const librarySummary: LibrarySummaryDto = (await librarySummariesView
      .findOne({ username })
      .exec()
      .catch((err) => console.error(err))) as LibrarySummaryDto;
    return librarySummary;
  }
}
