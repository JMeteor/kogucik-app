import { GetContactDto, GetItemDto } from './index.ts';

interface GetInvoiceDto {
  id: string;
  recipient: GetContactDto;
  sender: GetContactDto;
  items: GetItemDto[];
  name: string;
  createdAt: string;
  validUntil: string;
}

export default GetInvoiceDto;
