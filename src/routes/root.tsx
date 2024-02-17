import { Navigation, Outlet, useNavigation } from 'react-router-dom';

import TopNavigation from '../components/TopNavigation.tsx';
import { Container } from '@mui/material';

function Root() {
  const navigation: Navigation = useNavigation();

  return (
    <>
      <header>
        <TopNavigation />
      </header>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </div>
    </>
  );
}

export default Root;
