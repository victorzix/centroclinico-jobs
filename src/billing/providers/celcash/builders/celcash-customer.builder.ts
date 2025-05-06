import { CreateCustomerDto } from '../dto/customer/create-customer.dto';
import { Customer } from '../../../../customer/entities/customer.entity';
import { UpdateCustomerDto } from '../dto/customer/update-customer.dto';

export class CelcashCustomerBuilder {
  static buildCreateCustomer(dto: Customer): CreateCustomerDto {
    return {
      name: dto.name,
      document: dto.document,
      emails: [dto.email],
      myId: dto.id,
      phones: [dto.phone ? Number(dto.phone) : 0],
      Address: {
        city: dto.city ?? 'Sem informações',
        complement: dto.complement,
        neighborhood: dto.district ?? 'Sem informações',
        number: dto.number ?? 0,
        street: dto.address ?? 'Sem informações',
        zipCode: dto.cep ?? 95500000,
        state: dto.state ?? 'RS',
      },
    };
  }

  static buildUpdateCustomer(dto: Customer): UpdateCustomerDto {
    return {
      name: dto.name,
      phones: [Number(dto.phone)],
      document: dto.document,
      emails: [dto.email],
      Address: {
        city: dto.city,
        complement: dto.complement,
        neighborhood: dto.district,
        number: dto.number,
        state: dto.state,
        street: dto.address,
        zipCode: dto.cep,
      },
    };
  }
}
