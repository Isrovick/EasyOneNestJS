import { Test, TestingModule } from '@nestjs/testing';
import { ConverterService } from './converter.service';
import { caseJson_1, caseJson_2 } from '../../test/test-cases/converter.cases';
import { expectationJson_1 } from '../../test/test-cases/converter.expectations';

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConverterService],
    }).compile();

    service = module.get<ConverterService>(ConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all values from expectation 1 ', () => {
    const result = service.convert(caseJson_2)?.[0];
    if (!result) {
      throw new Error('result is undefined');
    }
    const { spam, virus, dns, mes, retrasado, emisor, receptor } = {
      ...expectationJson_1?.[0],
    };

    expect(result?.spam).toEqual(spam);
    expect(result?.virus).toEqual(virus);
    expect(result?.dns).toEqual(dns);
    expect(result?.mes).toEqual(mes);
    expect(result?.retrasado).toEqual(retrasado);
    expect(result?.emisor).toEqual(emisor);
    expect(result?.receptor).toEqual(receptor);
  });

  it('should return expected values ', () => {
    const result = service.convert(caseJson_1)?.[0];
    if (!result) {
      throw new Error('result is undefined');
    }

    expect(result?.spam).toEqual(false);
    expect(result?.virus).toEqual(true);
    expect(result?.dns).toEqual(false);
    expect(result?.mes).toEqual('ENERO');
    expect(result?.retrasado).toEqual(true);
    expect(result?.emisor).toEqual('se.n._der');
    expect(result?.receptor).toEqual(['recipient.123']);
  });
});
