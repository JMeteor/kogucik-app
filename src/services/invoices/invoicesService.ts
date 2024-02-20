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
    return await response.json();
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
