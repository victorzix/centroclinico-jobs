import { Customer } from '../entities/customer.entity';

export interface ICustomerService {
  createCustomer(dto: Customer): Promise<Customer>;

  updateCustomer(dto: Customer): Promise<Customer>;

  inactivateCustomer(id: string): Promise<void>;
}
