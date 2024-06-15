import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Library } from '@davidsmith/api-interfaces';

@Injectable()
export class LibraryService {
  getLibrary(): Library {
    const jsonStr = readFileSync(join(__dirname, 'assets', 'Library.json'), 'utf8');
    const json = JSON.parse(jsonStr);
    return json;
  }

}
