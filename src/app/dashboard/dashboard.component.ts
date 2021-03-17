import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';

import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  filter = '';
  customers$: Observable<Customer[]>;
  private destroyed$ = new Subject<boolean>();

  constructor(private store: CustomerFacade) { }

  ngOnInit(): void {
    this.customers$ = this.store.selectAll();
    this.store.getCustomers();
  }

  searchThis(val: string): void {
    this.filter = val;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
