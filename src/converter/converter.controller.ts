import { Body, Controller, Post } from '@nestjs/common';
import { ConverterService } from './converter.service';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post()
  convert(@Body() body) {
    return this.converterService.convert(body);
  }
}
