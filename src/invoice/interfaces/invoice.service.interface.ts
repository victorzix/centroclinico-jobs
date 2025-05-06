import { Invoice } from '../entities/invoice.entity';

export interface IInvoiceService {
  generateInvoice(dto: Invoice): Promise<Invoice>;

  updateInvoice(dto: Invoice): Promise<void>;

  cancelInvoice(id: string): Promise<void>;
}
