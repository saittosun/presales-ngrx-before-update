import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Customer } from '~types/customer';

export enum CustomerActions {
  getCustomers = '[Customers]: get all customers',
  getCustomersSuccess = '[Customers]: get all customers success',
  getCustomersFailed = '[Customers]: get all customers failed',
  updateCustomer = '[Customer-Edit]: update a customer',
  updateCustomerSuccess = '[Customer-Edit]: update customer success',
  updateCustomerFailed = '[Customer-Edit]: update customer failed',
  addCustomer = '[Customer-New-Form]: add a customer',
  addCustomerSuccess = '[Customer-New-Form]: add customer success',
  addCustomerFailed = '[Customer-New-Form]: add customer failed',
  setCustomers = '[Dashboard http request]: set all customers'
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

export const updateCustomer = createAction(
  CustomerActions.updateCustomer,
  props<{customer: Partial<Customer>, id: number}>()
)

export const updateCustomerSuccess = createAction(
  CustomerActions.updateCustomerSuccess,
  props<{ customer: Customer }>()
);

export const updateCustomerFailed = createAction(
  CustomerActions.updateCustomerFailed,
  props<{ error: string }>()
);

export const addCustomer = createAction(
  CustomerActions.addCustomer,
  props<{customer: Customer}>()
);

export const addCustomerSuccess = createAction(
  CustomerActions.addCustomerSuccess,
  props<{ customer: Customer }>()
);

export const addCustomerFailed = createAction(
  CustomerActions.addCustomerFailed,
  props<{ error: string }>()
);

export const setCustomers = createAction(
  CustomerActions.setCustomers,
  props<{customers: Customer[]}>()
)
