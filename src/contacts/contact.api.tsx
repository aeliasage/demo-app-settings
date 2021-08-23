import {
  createContact,
  deleteContact,
  getContact,
  getContactList,
  updateContact
} from '../services/contact.service';
import { Contact } from './contact';

export class ApiContact {
  id: string = '';
  name: string = '';
  lastName: string = '';
  type: string = 'Contact';
  title: string = '';
  notes: string = '';
}

export function convertContactFromApi(apiContact: ApiContact): Contact {
  return apiContact as Contact;
}

export async function getList(companyId: string): Promise<Contact[]> {
  const contactList = getContactList(companyId).then((results) => {
    const apiResults = results as ApiContact[];
    const resultList: Contact[] = [];

    for (let i = 0; i < apiResults.length; i++) {
      resultList.push(convertContactFromApi(apiResults[i]));
    }

    return resultList;
  });

  return contactList;
}

export async function getSingle(
  companyId: string,
  contactId: string
): Promise<Contact> {
  const contact = getContact(companyId, contactId).then((result) => {
    return convertContactFromApi(result as ApiContact);
  });

  return contact;
}

export async function saveApiContact(
  companyId: string,
  data: ApiContact
): Promise<ApiContact> {
  if (data.id && data.id.length === 36) {
    const value = await updateContact(companyId, data).then((result) => {
      return result as ApiContact;
    });

    return value;
  } else {
    const value = await createContact(companyId, data).then((result) => {
      return result as ApiContact;
    });

    return value;
  }
}

export async function deleteApiContact(
  companyId: string,
  contactId: string
): Promise<boolean> {
  return await deleteContact(companyId, contactId).then((result) => {
    return result as boolean;
  });
}
