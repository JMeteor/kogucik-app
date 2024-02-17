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

import { Invoice } from '../types/Invoice.ts';
import { OrderLine } from '../types/OrderLine.ts';
import { useState } from 'react';
import { formatDateLocale } from '../helpers/formatDateLocale.ts';
import { Link } from 'react-router-dom';

const rows: Invoice[] = [
  {
    invoiceNumber: '001',
    createDate: new Date(),
    dueDate: new Date(),
    recipient: null,
    sender: null,
    items: [],
  },
  {
    invoiceNumber: '002',
    createDate: new Date(),
    dueDate: new Date(),
    recipient: null,
    sender: null,
    items: [],
  },
];

const totalAmount = (items: OrderLine[]): number => {
  return items.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price),
    0,
  );
};

function Index() {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting invoice...', deleteId);
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">No.</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">Valid until</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Invoice) => (
              <TableRow
                key={row.invoiceNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Link to={`/invoice/${row.invoiceNumber}`}>
                    {row.invoiceNumber}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  {formatDateLocale(row.createDate)}
                </TableCell>
                <TableCell align="right">
                  {formatDateLocale(row.dueDate)}
                </TableCell>
                <TableCell align="right">{totalAmount(row.items)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    component={Link}
                    to={`/invoice/${row.invoiceNumber}/edit`}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row.invoiceNumber)}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
