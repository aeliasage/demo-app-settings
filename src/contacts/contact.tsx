import {
  ApiContact,
  convertContactFromApi,
  deleteApiContact,
  getList,
  getSingle,
  saveApiContact
} from './contact.api';
export class Contact {
  id: string = '';
  name: string = '';
  lastName: string = '';
  type: string = 'Person';
  title: string = '';
  notes: string = '';

  public async save(companyId: string): Promise<boolean> {
    const saved = await saveApiContact(
      companyId,
      convertContactToApi(this)
    ).then((result) => {
      return convertContactFromApi(result);
    });

    if (this.id) {
      if (
        this.id !== saved.id &&
        saved.id !== undefined &&
        saved.id.length === 36
      ) {
        this.id = saved.id;
      }
    } else {
      if (saved.id && saved.id !== undefined && saved.id.length === 36) {
        this.id = saved.id;
      }
    }

    if (this.id && this.id !== undefined && this.id.length === 36) {
      return true;
    } else {
      return false;
    }
  }

  public async delete(companyId: string): Promise<boolean> {
    if (!this.id) {
      return false;
    }

    return deleteApiContact(companyId, this.id);
  }
}

export function convertContactToApi(contact: Contact): ApiContact {
  return contact as ApiContact;
}

export async function getContactList(companyId: string): Promise<Contact[]> {
  return getList(companyId);
}

export async function getContact(
  companyId: string,
  contactId: string
): Promise<Contact> {
  return getSingle(companyId, contactId);
}
