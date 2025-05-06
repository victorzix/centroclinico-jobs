export class UpdateCustomerDto {
  name?: string;
  emails?: string[];
  document: string;
  phones?: number[];
  Address?: Address;
}

class Address {
  zipCode: number;
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}
