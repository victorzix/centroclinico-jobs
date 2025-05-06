import { $Enums } from '../../../generated/prisma';

export class Address {
  cep?: number;
  address?: string;
  complement?: string;
  district?: string;
  number?: number;
  city?: string;
  state?: string;
}

export class Customer extends Address {
  id: string;
  userId: string;
  externalId?: string;
  name: string;
  document: string;
  observation?: string;
  mainPaymentMethod: $Enums.PaymentType;
  status: string;
  email: string;
  phone: string;
  adherenceDate: Date;
  renovationDate?: Date;
  expireDate?: Date;
  clientType: $Enums.CustomerType;
  affiliateCode?: string;
  planId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
