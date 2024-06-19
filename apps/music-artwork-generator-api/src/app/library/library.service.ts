import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Library } from '@davidsmith/api-interfaces';

@Injectable()
export class LibraryService {
  saveLibrary(library): Library {
    writeFileSync(
      join(__dirname, 'assets', 'Library.json'),
      JSON.stringify({id: 1, ...library}),
      'utf8'
    );
    return this.getLibrary(1);
  }

  getLibrary(id: number): Library {
    const jsonStr = readFileSync(join(__dirname, 'assets', 'Library.json'), 'utf8');
    const json = JSON.parse(jsonStr);
    return json;
  }

}
