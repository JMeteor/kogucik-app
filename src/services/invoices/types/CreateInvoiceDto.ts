import { ContactBaseDto, GetItemDto } from './index.ts';

interface CreateInvoiceDto {
  recipient: ContactBaseDto;
  sender: ContactBaseDto;
  name: string;
  createdAt: string;
  validUntil: string;
  items: GetItemDto[];
}

export default CreateInvoiceDto;
