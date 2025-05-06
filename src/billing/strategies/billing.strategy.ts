import { Customer } from '../../customer/entities/customer.entity';

export interface BillingStrategy {
  createCustomer: (dto: Customer) => Promise<string>;
  updateCustomer: (dto: Customer) => Promise<void>;
  generateInvoice: () => Promise<void>;
  updateInvoice: () => Promise<void>;
  cancelInvoice: () => Promise<void>;
}
