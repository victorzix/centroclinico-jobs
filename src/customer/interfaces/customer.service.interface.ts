import { Customer } from '../entities/customer.entity';

export interface ICustomerService {
  createCustomer(dto: Customer): Promise<Customer>;

  // updateCustomer(id: string, dto: UpdateCustomerDto): Promise<Customer>;

  // inactivateCustomer(id: string): Promise<void>;
}
