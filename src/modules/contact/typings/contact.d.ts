export interface Contact {
  id: string;
  name: string;
  email: string;
  tel: string;
}

export type ListContactResponse = Contact[];

export type GetContactResponse = Contact;

export type CreateContactResponse = Contact;

export type UpdateContactResponse = Contact;
