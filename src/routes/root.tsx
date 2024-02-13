import {
  Navigation,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';

import { createContact, getContacts } from '../services/contacts.ts';
import { IContact } from '../types/Contact.ts';
import { useEffect } from 'react';
import TopNavigation from '../components/TopNavigation.tsx';
import { Container } from '@mui/material';

// query parameter powinien być w loaderze nie w akcji
export async function loader({ request }: any) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const contacts: IContact[] = await getContacts(query);
  return { contacts, query };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

function Root() {
  const { query }: any = useLoaderData();
  const navigation: Navigation = useNavigation();

  useEffect(() => {
    const searchInput = document.getElementById('q');
    if (searchInput) {
      (searchInput as HTMLInputElement).value = query;
    }
  }, [query]);

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
