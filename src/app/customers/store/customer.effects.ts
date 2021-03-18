import { Router } from '@angular/router';
import { Customer } from './../../types/customer';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, find, map, switchMap, tap } from "rxjs/operators";

import { CustomerService } from "../services/customer.service";

import { getCustomersFailed, updateCustomerFailed, updateCustomerSuccess } from "./customer.actions";
import { getCustomersSuccess } from "./customer.actions";
import { CustomerActions } from "./customer.actions";

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private router: Router
  ) { }

  public getCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.getCustomers),
      switchMap(() =>
        this.customerService.fetchCustomers().pipe(
          map((results: Customer[]) => getCustomersSuccess({ results })),
          catchError((error: any) => of(getCustomersFailed({ error })))
        )
      )
    )
  );

  public updateCustomer$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CustomerActions.updateCustomer),
    switchMap(({customer, id}: {customer: Customer; id: number}) =>
      this.customerService.updateCustomer(id, customer).pipe(
        map((customer: Customer) => updateCustomerSuccess({ customer })),
        tap(() => {
          this.router.navigate(['customers', id])
        }),
        catchError((error: any) => of(updateCustomerFailed({ error })))
        )
      )
    )
  );
}
