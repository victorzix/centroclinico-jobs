import { Invoice } from '../../../../invoice/entities/invoice.entity';
import { CreateInvoiceDto } from '../dto/invoice/create-invoice.dto';
import { $Enums } from '../../../../../generated/prisma';
import { format } from 'date-fns';
import { UpdateInvoiceDto } from '../dto/invoice/update-invoice.dto';

export class CelcashInvoiceBuilder {
  static buildGenerateInvoice(dto: Invoice): CreateInvoiceDto {
    return {
      myId: dto.id,
      payday: format(dto.dueDate, 'yyyy-MM-dd'),
      value: dto.amount,
      mainPaymentMethodId: this.buildPaymentMethod(
        dto.Subscription.paymentType,
      ),
      Customer: {
        emails: [dto.Subscription.Customer.email],
        myId: dto.Subscription.customerId,
        document: dto.Subscription.Customer.document,
        name: dto.Subscription.Customer.name,
      },
    };
  }

  static buildUpdateInvoice(dto: Invoice): UpdateInvoiceDto {
    return {
      payday: format(dto.dueDate, 'yyyy-MM-dd'),
      value: dto.amount,
    };
  }

  private static buildPaymentMethod(paymentMethod: $Enums.PaymentType): string {
    switch (paymentMethod) {
      case 'BOLETO':
        return 'boleto';
      case 'CREDIT_CARD':
        return 'creditcard';
      case 'PIX':
        return 'pix';
      default:
        return 'creditcard';
    }
  }
}
