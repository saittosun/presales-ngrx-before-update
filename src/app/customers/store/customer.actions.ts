import { createAction, props } from '@ngrx/store';

import { Customer } from '~types/customer';

export enum CustomerActions {
  getCustomers = '[Customers]: get all customers',
  getCustomersSuccess = '[Customers]: get all customers success',
  getCustomersFailed = '[Customers]: get all customers failed'
}

export const getCustomers = createAction(CustomerActions.getCustomers);

export const getCustomersSuccess = createAction(
  CustomerActions.getCustomersSuccess,
  props<{ results: Customer[] }>()
);

export const getCustomersFailed = createAction(
  CustomerActions.getCustomersFailed,
  props<{ error: string }>()
);
