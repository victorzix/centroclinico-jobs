import { $Enums } from '../../../generated/prisma';
import { Customer } from '../../customer/entities/customer.entity';

export class Invoice {
  id: string;
  subscriptionId: string;
  dueDate: Date;
  amount: number;
  paymentLink?: string;
  status: $Enums.InvoiceStatus;
  Subscription: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

class Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: $Enums.SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  firstPayDayDate: Date;
  paymentType: $Enums.PaymentType;
  Customer: Customer;
  installments: number;
  createdAt: Date;
  updatedAt: Date;
}

