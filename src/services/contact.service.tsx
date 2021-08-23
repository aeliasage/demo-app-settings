import { ApiContact } from '../contacts/contact.api';
import ApiRequest from './api-request';
import BaseRoutes from './base-routes';

export async function getContactList(
  companyId: string
): Promise<ApiContact[] | Error> {
  try {
    const data = await ApiRequest.get<ApiContact[] | Error>(
      await BaseRoutes.Contacts(),
      companyId
    );

    if (data) {
      return data;
    }
  } catch (error) {
    return Promise.reject(new Error('Failed to retrieve Contact list'));
  }

  return Promise.reject(new Error('Failed to retrieve Contact list'));
}

export async function getContact(
  companyId: string,
  contactId: string
): Promise<ApiContact | Error> {
  try {
    const data = await ApiRequest.get<ApiContact | Error>(
      (await BaseRoutes.Contacts()) + `/${contactId}`,
      companyId
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return Promise.reject(new Error('Failed to retrieve Contact'));
  }

  return Promise.reject(new Error('Failed to retrieve Contact'));
}

export async function createContact(
  companyId: string,
  contact: ApiContact
): Promise<ApiContact | Error> {
  try {
    const data = await ApiRequest.post<ApiContact | Error>(
      (await BaseRoutes.Contacts()) + `/contact`,
      contact,
      companyId
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return Promise.reject(new Error(`Failed to create Contact`));
  }

  return Promise.reject(new Error(`Failed to create Contact`));
}

export async function updateContact(
  companyId: string,
  contact: ApiContact
): Promise<ApiContact | Error> {
  try {
    const data = await ApiRequest.put<ApiContact | Error>(
      (await BaseRoutes.Contacts()) + `/${contact.id}`,
      contact,
      companyId
    );
    if (data) {
      return data;
    }
  } catch (error) {
    return Promise.reject(new Error(`Failed to update Contact`));
  }

  return Promise.reject(new Error(`Failed to update Contact`));
}

export async function deleteContact(
  companyId: string,
  contactId: string
): Promise<boolean | Error> {
  try {
    const response = await ApiRequest.delete(
      (await BaseRoutes.Contacts()) + `/${contactId}`,
      companyId
    );
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return Promise.reject(new Error(`Failed to delete Contact`));
  }

  return Promise.reject(new Error(`Failed to delete Contact`));
}
