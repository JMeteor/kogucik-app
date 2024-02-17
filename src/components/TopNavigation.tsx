import { AppBar, Box, Container, Icon, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TopNavigation() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Button
              onClick={() => navigate('/')}
              sx={{ color: 'white', my: 2, display: 'block' }}
            >
              {t('INVOICES')}
            </Button>
            <Button
              onClick={() => navigate('/add-invoice')}
              sx={{ color: 'white', my: 2, display: 'block' }}
            >
              {t('ADD_INVOICE')}
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              startIcon={<Icon>language</Icon>}
              onClick={() =>
                changeLanguage(`${i18n.language === 'en' ? 'pl' : 'en'}`)
              }
              sx={{
                color: 'white',
                my: 2,
              }}
            >
              {i18n.language === 'en' ? 'Polski' : 'English'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNavigation;
