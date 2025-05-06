import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { Customer } from '../../customer/entities/customer.entity';

export interface BillingStrategy {
  createCustomer: (dto: Customer) => Promise<string>;
  updateCustomer: () => Promise<void>;
  generateInvoice: () => Promise<void>;
  updateInvoice: () => Promise<void>;
  cancelInvoice: () => Promise<void>;
}
