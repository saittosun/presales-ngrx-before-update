import { CustomerService } from './../customers/services/customer.service';
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
  private destroyed$ = new Subject<boolean>();
  customers: Customer[];
  filteredCustomers: Customer[]

  constructor(private store: CustomerFacade,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.store.getCustomers().subscribe(customers => {
      if(customers.length === 0) {
        // http request
        this.customerService.fetchCustomers().subscribe(customers => {
          this.store.setCustomers(customers);
          this.customers = customers;
          this.filteredCustomers = [...this.customers];
        });
      } else {
        this.customers = customers;
        this.filteredCustomers = [...this.customers];
      }
    })
  }

  searchThis(val: string): void {
    if (val === null || val === '') {
      this.filteredCustomers = [...this.customers];
      return;
    }
    this.filteredCustomers = [...this.customers.filter(customer => {
      return customer.customername.toLowerCase().includes(val.toLowerCase()) || customer.projectname.toLowerCase().includes(val.toLowerCase())
    })]
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
