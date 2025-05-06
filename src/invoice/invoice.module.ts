import { Module } from '@nestjs/common';
import { BillingModule } from '../billing/billing.module';
import { InvoiceService } from './services/invoice.service';
import { INVOICE_SERVICE } from './tokens';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BillingModule,
    BullModule.registerQueue({
      name: 'invoice',
    }),
  ],
  providers: [
    {
      provide: INVOICE_SERVICE,
      useClass: InvoiceService,
    },
  ],
})
export default class InvoiceModule {}
