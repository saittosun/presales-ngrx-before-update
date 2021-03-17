import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Customer } from '~types/customer';

import { getCustomers } from '../store/customer.actions';
import {
  CUSTOMERS_ALL,
  CUSTOMERS_ERROR,
  CUSTOMERS_LOADING
} from '../store/customer.selectors';
import { AppState } from '../store/customer.types';

@Injectable()
export class CustomerFacade {
  constructor(private store: Store<AppState>) { }

  public selectAll(): Observable<Customer[]> {
    return this.store.pipe(select(CUSTOMERS_ALL));
  }

  public selectLoading(): Observable<boolean> {
    return this.store.pipe(select(CUSTOMERS_LOADING));
  }

  public selectError(): Observable<string> {
    return this.store.pipe(select(CUSTOMERS_ERROR));
  }

  public getCustomers() {
    return this.store.dispatch(getCustomers());
  }
}
