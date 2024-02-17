import ContactBaseDto from './ContactBaseDto.ts';
import GetItemDto from './GetItemDto.ts';

interface UpdateInvoiceDto {
  recipient: ContactBaseDto;
  sender: ContactBaseDto;
  name: string;
  createdAt: string;
  validUntil: string;
  items: GetItemDto[];
}

export default UpdateInvoiceDto;
