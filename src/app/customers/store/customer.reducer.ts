import { Customer } from './../../types/customer';
import { Action, ActionReducerMap, createReducer, on } from "@ngrx/store";
import {
  getCustomers,
  getCustomersFailed,
  getCustomersSuccess,
  updateCustomerSuccess
} from "./customer.actions";
import { CustomersState, CustomerListState } from "./customer.types";

export const CUSTOMER_INITIAL_STATE: CustomerListState = {
  results: [],
  loading: false,
  error: null
};

export const listReducer = createReducer(
  CUSTOMER_INITIAL_STATE as any,
  on(getCustomers, (actionState: CustomerListState) => ({
    ...actionState,
    loading: true,
    error: null
  })) as any,
  on(
    getCustomersSuccess,
    (state: CustomerListState, { results }: any) => ({
      ...state,
      results,
      loading: false,
      error: null
    })
  ) as any,
  on(
    getCustomersFailed,
    (state: CustomerListState, { error }: any) => ({
      ...state,
      loading: false,
      error
    })
  ) as any,
  on(
    updateCustomerSuccess,
    (state: CustomerListState, { customer }: {customer: Customer}) => {
      const customerIndex = state.results.findIndex(item => item.id === customer.id)
      if (customerIndex === -1) {
        return {
          ...state,
          results: state.results.concat(customer),
          loading: false,
          error: null
        }
      }
      return  {
        ...state,
        results: [
          ...state.results.slice(0, customerIndex),
          customer,
          ...state.results.slice(customerIndex + 1)
        ],
        loading: false,
        error: null
      }
    }
  )
);

function listReducerWrapper(state: CustomerListState, action: Action) {
  return listReducer(state, action);
}

export const customerReducers: any = {
  list: listReducerWrapper
  // detail: detailReducer,
};
