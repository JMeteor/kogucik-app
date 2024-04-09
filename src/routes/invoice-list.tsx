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

import { useDeleteInvoice, useGetInvoices } from '../hooks/invoices.hooks.ts';
import { type OrderLine } from '../types/OrderLine.ts';
import { format, parseISO } from 'date-fns';

export const InvoiceList = () => {
  const { t } = useTranslation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const deleteInvoiceMutation = useDeleteInvoice();

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteInvoiceMutation.mutate(deleteId);
    }
    setDeleteId(null);
  };

  const totalAmount = (items: OrderLine[]) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price || '0');
      const amount = item.amount || 0;
      return acc + amount * price;
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
              {invoices?.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link to={`/invoice/${invoice.id}`}>{invoice.name}</Link>
                  </TableCell>
                  <TableCell align="right">
                    {format(parseISO(invoice.createdAt), 'MM/dd/yyyy')}
                  </TableCell>
                  <TableCell align="right">
                    {format(parseISO(invoice.validUntil), 'MM/dd/yyyy')}
                  </TableCell>
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
            <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
              <DialogTitle>{t('DELETE_INVOICE.TITLE')}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {t('DELETE_INVOICE.CONTENT')}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteId(null)}>
                  {t('LABELS.CANCEL')}
                </Button>
                <Button onClick={handleDeleteConfirm} autoFocus>
                  {t('LABELS.DELETE')}
                </Button>
              </DialogActions>
            </Dialog>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
