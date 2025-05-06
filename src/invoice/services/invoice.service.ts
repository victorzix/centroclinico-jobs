import { Invoice } from '../entities/invoice.entity';
import { IInvoiceService } from '../interfaces/invoice.service.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { BILLING_STRATEGY } from '../../billing/tokens';
import { BillingStrategy } from '../../billing/strategies/billing.strategy';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('invoice', { limiter: { max: 1, duration: 5000 } })
export class InvoiceService extends WorkerHost implements IInvoiceService {
  constructor(
    @Inject(BILLING_STRATEGY) private readonly billingStrategy: BillingStrategy,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case 'createInvoice':
        await this.generateInvoice(job.data);
        break;
      case 'updateInvoice':
        await this.updateInvoice(job.data);
        break;
      default:
        throw new BadRequestException('Não foi possível processar a fila');
    }
  }

  async generateInvoice(dto: Invoice): Promise<Invoice> {
    try {
      const paymentLink = await this.billingStrategy.generateInvoice(dto);
      await this.prisma.invoice.update({
        where: { id: dto.id },
        data: { paymentLink },
      });
      return dto;
    } catch (err) {
      console.error(err);
    }
  }

  async updateInvoice(dto: Invoice): Promise<void> {
    try {
      await this.billingStrategy.updateInvoice(dto);
      return;
    } catch (err) {
      console.error(err);
    }
  }

  cancelInvoice(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
