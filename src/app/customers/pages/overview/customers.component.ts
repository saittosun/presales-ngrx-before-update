import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from '~customers/services/customer.service';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersOverviewPageComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  private destroyed$ = new Subject<boolean>();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
