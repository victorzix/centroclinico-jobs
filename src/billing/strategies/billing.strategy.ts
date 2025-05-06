import { Customer } from '../../customer/entities/customer.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';

export interface BillingStrategy {
  createCustomer: (dto: Customer) => Promise<string>;
  updateCustomer: (dto: Customer) => Promise<void>;
  inactivateCustomer?: (id: string) => Promise<void>;
  generateInvoice: (dto: Invoice) => Promise<string>;
  updateInvoice: (dto: Invoice) => Promise<void>;
  cancelInvoice: (id: string) => Promise<void>;
}
