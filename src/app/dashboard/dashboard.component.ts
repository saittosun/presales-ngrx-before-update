import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  filter = '';
  customers$: Observable<Customer[]>;
  private destroyed$ = new Subject<boolean>();
  customers: Customer[];
  filteredCustomers: Customer[]

  constructor(private store: CustomerFacade) { }

  ngOnInit(): void {
    this.customers$ = this.store.selectAll();
    this.store.getCustomers();
    this.customers$.subscribe(customers => {
      this.customers = customers;
    })
    this.filteredCustomers = [...this.customers];
  }

  // searchThis(val: string): void {
  //   this.filter = val;
  // }

  searchThis(val: string): void {
    if (val === null || val === '') {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = [...this.customers.filter(customer => {
      console.log(customer);
      return customer.customerName.toLowerCase().includes(val.toLowerCase()) || customer.projectName.toLowerCase().includes(val.toLowerCase())
    })]
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
