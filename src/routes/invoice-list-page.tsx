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
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import GetItemDto from '../services/invoices/types/GetItemDto.ts';
import GetAllInvoicesDto from '../services/invoices/types/GetAllInvoicesDto.ts';
import { useDeleteInvoice, useGetInvoices } from '../hooks/invoices.hooks.ts';

function InvoiceListPage() {
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const deleteInvoiceMutation = useDeleteInvoice();

  const handleDeleteConfirm = async () => {
    console.log('Deleting invoice...', deleteId);
    if (deleteId) {
      deleteInvoiceMutation.mutate(deleteId);
    }
    setDeleteModalOpen(false);
    setDeleteId(null);
  };

  const totalAmount = (items: GetItemDto[]) => {
    return items.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  };

  const { data: invoices, isLoading, isError } = useGetInvoices();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error, please try again</div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {t('TABLE.HEADERS.INVOICE_NUMBER')}
                </TableCell>
                <TableCell align="right">
                  {t('TABLE.HEADERS.CREATED')}
                </TableCell>
                <TableCell align="right">
                  {t('TABLE.HEADERS.VALID_UNTIL')}
                </TableCell>
                <TableCell align="right">{t('TABLE.HEADERS.AMOUNT')}</TableCell>
                <TableCell align="center">
                  {t('TABLE.HEADERS.ACTIONS')}
                </TableCell>
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
                      to={`/invoice/${invoice.id}?mode=edit`}
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
            <Dialog
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
            >
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this invoice?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirm} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default InvoiceListPage;
