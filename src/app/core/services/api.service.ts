import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '~types/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private _customersSub = new BehaviorSubject<Customer[]>( new Api().customers)

  // constructor() { }

  // get customersSub() {
  //   return this._customersSub.asObservable();
  // }

  // updateCustomer(customers: Customer[]) {
  //   this._customersSub.next(customers)
  // }

}
