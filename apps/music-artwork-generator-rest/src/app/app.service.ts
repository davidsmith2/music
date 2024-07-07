import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { LibraryDto } from '@davidsmith/api-interfaces';

export class AppService {
  private filepath = join(__dirname, '../../../', 'uploads', 'Library.json');

  readLibrary(): LibraryDto {
    return JSON.parse(readFileSync(this.filepath, 'utf8'));
  }

  writeLibrary(library: LibraryDto): void {
    writeFileSync(this.filepath, JSON.stringify(library), 'utf8');
  }

}
