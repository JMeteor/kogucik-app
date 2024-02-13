// import * as React from 'react';
import { AppBar, Box, Container, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const pages = ['Invoices', 'Add new invoices'];

function TopNavigation() {
  const navigate = useNavigate();
  const handleButtonClick = (page: string) => {
    const route = page === 'Invoices' ? '/' : '/add-invoice';
    navigate(route);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                onClick={() => handleButtonClick(page)}
                key={page}
                sx={{ color: 'white', my: 2, display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNavigation;
