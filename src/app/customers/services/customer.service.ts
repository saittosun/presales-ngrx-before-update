import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Customer } from '~types/customer';
import { map, take } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  customers: Observable<Customer[]>;
  customer: Customer;

  fetchCustomers(): Observable<Customer[]> {
    return of([
      {
        id: 1,
        customerName: 'Antwerpen',
        projectName: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 2,
        customerName: 'Renson',
        projectName: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        phonenumber: 22222222,
        vat: 11,
        address: {
          addressline: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 3,
        customerName: 'Brussel',
        projectName: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 4,
        customerName: 'Gent',
        projectName: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 5,
        customerName: 'Brugge',
        projectName: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
    ])
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return of({...customer, id})
  }
}
