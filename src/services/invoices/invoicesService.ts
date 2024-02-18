import {
  CreateInvoiceDto,
  GetAllInvoicesDto,
  GetInvoiceDto,
  UpdateInvoiceDto,
} from './types';

class InvoicesService {
  private static readonly BASE_URL = 'http://localhost:4000/api/invoices';

  fetchAllInvoices = async (): Promise<GetAllInvoicesDto[]> => {
    const response = await fetch(InvoicesService.BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  fetchInvoiceById = async (id: string): Promise<GetInvoiceDto> => {
    const response = await fetch(`${InvoicesService.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  createInvoice = async (invoice: CreateInvoiceDto): Promise<void> => {
    const response = await fetch(InvoicesService.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  updateInvoice = async (
    id: string,
    invoice: UpdateInvoiceDto,
  ): Promise<void> => {
    const response = await fetch(`${InvoicesService.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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
