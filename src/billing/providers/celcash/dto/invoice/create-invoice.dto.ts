export class CreateInvoiceDto {
  myId: string;
  value: number;
  payday: string;
  mainPaymentMethodId: string;
  Customer: Customer;
}

class Customer {
  myId: string;
  name: string;
  document: string;
  emails: string[];
}
