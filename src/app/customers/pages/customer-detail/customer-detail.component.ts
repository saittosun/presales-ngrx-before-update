import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Observable, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailPageComponent implements OnInit {
  customers$: Observable<Customer[]>;
  private destroyed$ = new Subject<boolean>();
  customer: Customer;
  id: number;

  constructor(private store: CustomerFacade,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const customerId = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    })
    this.customers$ = this.store.selectAll();
    this.store.getCustomers();
    this.customers$.pipe(take(1), map(customers => {
      return customers.find(customer => customer.id === +customerId)
    })).subscribe(customer => console.log(customer))
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}

