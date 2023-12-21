import { BadRequestException, Injectable } from '@nestjs/common';
import { SingleExpectationType } from '../types/converter.type';

@Injectable()
export class ConverterService {
  constructor() {}
  convert(_source): Array<SingleExpectationType> {
    const records = _source?.Records;
    if (!records?.length) {
      throw new BadRequestException('Invalid JSON, Missing records object.');
    }

    return records.map((record: any) => this.convertSingleRecord(record));
  }

  convertSingleRecord(record: any): SingleExpectationType {
    if (!record) {
      return {} as SingleExpectationType;
    }

    const receipt = record?.ses?.receipt;
    const mail = record?.ses?.mail;

    const spam = receipt?.spamVerdict?.status === 'PASS';

    const virus = receipt?.virusVerdict?.status === 'PASS';

    const dns =
      receipt?.spfVerdict?.status === 'PASS' &&
      receipt?.dkimVerdict?.status === 'PASS' &&
      receipt?.dmarcVerdict?.status === 'PASS';

    const mes = new Date(mail?.timestamp)
      ?.toLocaleString('es-ES', {
        month: 'long',
      })
      ?.toUpperCase();

    const retrasado = receipt?.processingTimeMillis > 1000;

    const emisor = mail?.source?.replace(/@.*/, '');

    const receptor =
      mail?.destination?.map((d: string) => d.replace(/@.*/, '')) || [];

    return {
      spam,
      virus,
      dns,
      mes,
      retrasado,
      emisor,
      receptor,
    };
  }
}
