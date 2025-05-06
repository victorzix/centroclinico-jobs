export class CreateCustomerDto {
  myId: string;
  name: string;
  document: string;
  emails: string[];
  phones: number[];
  Address: Address;
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