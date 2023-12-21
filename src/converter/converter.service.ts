import { Injectable } from '@nestjs/common';
import { SingleExpectationType } from '../types/converter.type';

@Injectable()
export class ConverterService {
  constructor() {}
  convert(source: string): Array<SingleExpectationType> {
    return;
  }
}
