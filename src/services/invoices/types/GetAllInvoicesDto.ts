import GetItemDto from './GetItemDto.ts';

interface GetAllInvoicesDto {
  id: string;
  items: GetItemDto[];
  name: string;
  createdAt: string;
  validUntil: string;
}

export default GetAllInvoicesDto;
