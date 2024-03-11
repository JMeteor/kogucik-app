import {
  type CreateInvoiceDto,
  GetInvoiceDto,
  UpdateInvoiceDto,
} from './types';
import InvoiceSchema from "../../types/Invoice.ts";
import {z} from "zod";

class InvoicesService {
  private static readonly BASE_URL = 'http://localhost:4000/api/invoices';

  fetchAllInvoices = async () => {
    const response = await fetch(InvoicesService.BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return z.array(InvoiceSchema).parse(data);
  };

  fetchInvoiceById = async (id: string): Promise<GetInvoiceDto> => {
    const response = await fetch(`${InvoicesService.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  createInvoice = async (data: CreateInvoiceDto): Promise<void> => {
    const response = await fetch(InvoicesService.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  updateInvoice = async (id: string, data: UpdateInvoiceDto): Promise<void> => {
    const response = await fetch(`${InvoicesService.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  };

  deleteInvoice = async (id: string): Promise<void> => {
    const response = await fetch(`${InvoicesService.BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  };
}

export default new InvoicesService();
