import { BillingStrategy } from '../../strategies/billing.strategy';
import { celcashRequestUtils } from './utils/celcash.utils';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Customer } from '../../../customer/entities/customer.entity';
import { CelcashCustomerBuilder } from './builders/celcash-customer.builder';
import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class CelcashProvider implements BillingStrategy {
  private readonly apiUrl: string;
  private readonly headers: {};

  constructor(private readonly httpService: HttpService) {
    const { headers, url } = celcashRequestUtils();
    this.apiUrl = url;
    this.headers = headers;
  }

  private async generateToken() {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.apiUrl}token`,
          {
            grant_type: 'authorization_code',
            scope:
              'customers.read customers.write plans.read plans.write transactions.read transactions.write webhooks.write balance.read balance.write cards.read cards.write card-brands.read subscriptions.read subscriptions.write charges.read charges.write boletos.read',
          },
          {
            headers: this.headers,
          },
        ),
      );
      return response.data.access_token;
    } catch (err) {
      return err;
    }
  }

  async createCustomer(dto: Customer): Promise<string> {
    try {
      const token = await this.generateToken();
      const response = await lastValueFrom(
        this.httpService.post(
          `${this.apiUrl}customers`,
          CelcashCustomerBuilder.buildCreateCustomer(dto),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data.Customer.galaxPayId.toString();
    } catch (err) {
      console.error(err);
    }
  }

  async updateCustomer(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async generateInvoice(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async updateInvoice(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async cancelInvoice(): Promise<void> {
    try {
      const token = await this.generateToken();
    } catch (err) {}
  }
}
