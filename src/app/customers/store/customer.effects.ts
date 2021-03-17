import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { Customer } from "~types/customer";

import { CustomerService } from "../services/customer.service";

import { getCustomersFailed } from "./customer.actions";
import { getCustomersSuccess } from "./customer.actions";
import { CustomerActions } from "./customer.actions";

@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
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
}
