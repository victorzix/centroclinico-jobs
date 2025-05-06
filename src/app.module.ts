import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { BillingModule } from './billing/billing.module';
import CustomerModule from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import InvoiceModule from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule,
    BillingModule,
    CustomerModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
