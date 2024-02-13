import { deleteContact } from '../services/contacts.ts';
import { redirect } from 'react-router-dom';

export async function action({ params }: any) {
  // throw new Error('Oh dang!');
  await deleteContact(params.contactId);
  return redirect('/');
}
