import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailPageComponent implements OnInit {
  customer: Customer;


  constructor(private store: CustomerFacade,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.store.getCustomers();
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}

