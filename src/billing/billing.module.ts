import { Module } from '@nestjs/common';
import { CelcashProvider } from './providers/celcash/celcash.provider';
import { paymentGatewayProvider } from './providers/billing.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CelcashProvider, paymentGatewayProvider],
  exports: [paymentGatewayProvider],
  imports: [HttpModule]
})
export class BillingModule {}
