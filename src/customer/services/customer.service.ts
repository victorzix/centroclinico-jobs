import { Customer } from '../entities/customer.entity';
import { ICustomerService } from '../interfaces/customer.service.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { BILLING_STRATEGY } from '../../billing/tokens';
import { BillingStrategy } from '../../billing/strategies/billing.strategy';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service';

@Processor('customer', { limiter: { max: 1, duration: 5000 } })
export class CustomerService extends WorkerHost implements ICustomerService {
  constructor(
    @Inject(BILLING_STRATEGY) private readonly billingStrategy: BillingStrategy,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    switch (job.name) {
      case 'createCustomer':
        await this.createCustomer(job.data);
        break;
      case 'updateCustomer':
        await this.updateCustomer(job.data);
        break;
      case 'inactivateCustomer':
        await this.inactivateCustomer(job.data);
        break;
      default:
        throw new BadRequestException('Não foi possível processar a fila');
    }
  }

  async createCustomer(dto: Customer): Promise<Customer> {
    try {
      const externalId = await this.billingStrategy.createCustomer(dto);
      await this.prisma.customer.update({
        where: { id: dto.id },
        data: { externalId },
      });
      return dto;
    } catch (err) {
      console.error(err);
    }
  }

  async updateCustomer(dto: Customer): Promise<Customer> {
    try {
      await this.billingStrategy.updateCustomer(dto);
      return dto;
    } catch (err) {
      console.error(err);
    }
  }

  async inactivateCustomer(id: string): Promise<void> {
    try {
      await this.billingStrategy.inactivateCustomer(id);
      return;
    } catch (err) {
      console.error(err);
    }
  }
}
