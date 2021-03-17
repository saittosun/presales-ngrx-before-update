export interface Customer {
  id: number;
  customerName: string;
  projectName: string;
  status: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phonenumber: number;
  vat: number;
  address: Address;
}

export interface Address {
  addressline: string;
  city: string;
  country: string;
  state: string;
  zip: number;
}
