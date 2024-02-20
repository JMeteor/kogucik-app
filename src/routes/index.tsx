import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { useState } from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import InvoicesService from '../services/invoices/invoicesService.ts';
import GetItemDto from '../services/invoices/types/GetItemDto.ts';
import GetAllInvoicesDto from '../services/invoices/types/GetAllInvoicesDto.ts';

function Index() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;

    console.log('Deleting invoice...', deleteId);
    await InvoicesService.deleteInvoice(deleteId);
    setOpen(false);
  };

  // It can be moved to zod parser
  const totalAmount = (items: GetItemDto[]) => {
    return items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  };

  // Should be parsed with zod
  const { data: invoices } = useQuery(
    'invoices',
    InvoicesService.fetchAllInvoices
  );

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                {t('TABLE.HEADERS.INVOICE_NUMBER')}
              </TableCell>
              <TableCell align="right">{t('TABLE.HEADERS.CREATED')}</TableCell>
              <TableCell align="right">
                {t('TABLE.HEADERS.VALID_UNTIL')}
              </TableCell>
              <TableCell align="right">{t('TABLE.HEADERS.AMOUNT')}</TableCell>
              <TableCell align="center">{t('TABLE.HEADERS.ACTIONS')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((invoice: GetAllInvoicesDto, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/invoice/${invoice.id}`}>{invoice.name}</Link>
                </TableCell>
                <TableCell align="right">{invoice.createdAt}</TableCell>
                <TableCell align="right">{invoice.validUntil}</TableCell>
                <TableCell align="right">
                  {totalAmount(invoice.items)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to={`/invoice/${invoice.id}/edit`}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* Could be placed with its own logic in separate component within DeleteButton */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this invoice?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Table>
      </TableContainer>
    </>
  );
}

export default Index;
