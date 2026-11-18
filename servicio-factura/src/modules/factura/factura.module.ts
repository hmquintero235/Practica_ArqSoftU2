import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service.js';
import { FacturaController } from './factura.controller.js';

@Module({
  providers: [FacturaService],
  controllers: [FacturaController]
})
export class FacturaModule {}
