import { Module } from '@nestjs/common';
import { BillingModule } from '../billing/billing.module';
import { CustomerService } from './services/customer.service';
import { CUSTOMER_SERVICE } from './tokens';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BillingModule,
    BullModule.registerQueue({
      name: 'customer',
    }),
  ],
  providers: [
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomerService,
    },
  ],
})
export default class CustomerModule {}
