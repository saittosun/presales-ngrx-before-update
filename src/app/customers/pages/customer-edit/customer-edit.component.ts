import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Countries } from '~types/countries';
import { Country } from '~types/country';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditPageComponent implements OnInit {
  customers$: Observable<Customer[]>;
  customers: Customer[];
  customer: Customer;
  updateCustomer: Customer;
  id: number;
  leadForm: FormGroup;
  countries: Country [] = new Countries().countries;
  editted: boolean = false;
  private destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private store: CustomerFacade) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.customers$ = this.store.selectAll();
    this.store.getCustomers();
    this.customers$.pipe(take(1)).subscribe(customers => {
      this.customers = customers;
    })
    this.customer = this.customers.find(customer => {
      return customer.id === +this.id
    })
    this.createForm();
  }

  update(val) {
    const customer: Customer = {
      id: +val.id,
      customerName: val.customerName,
      projectName: val.projectName,
      status: null,
      date: null,
      firstName: val.firstName,
      lastName: val.lastName,
      email: val.email,
      phonenumber: val.phonenumber,
      vat: val.vat,
      address: {
        addressline: val.addressline1,
        city: val.city,
        state: val.state,
        country: val.country,
        zip: val.zip
      },

    }
    this.store.updateCustomer(this.id, customer);
    // console.log(this.store.loadCustomers());
    return customer.id;
  }

  private createForm() {
    this.leadForm = this.fb.group({
      customername: new FormControl(this.customer.customerName, Validators.required),
      addressline1: new FormControl(this.customer.address.addressline, Validators.required),
      addressline2: new FormControl(''),
      country: new FormControl(this.customer.address.country, Validators.required),
      city: new FormControl(this.customer.address.city, Validators.required),
      state: new FormControl(this.customer.address.state, Validators.required),
      zip: new FormControl(this.customer.address.zip, Validators.required),
      vat: new FormControl(this.customer.vat, Validators.required),
      firstname: new FormControl(this.customer.firstName, Validators.required),
      lastname: new FormControl(this.customer.lastName, Validators.required),
      email: new FormControl(this.customer.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      phonenumber: new FormControl(this.customer.phonenumber, [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern("^[0-9]*$"),
      ]),
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onEditForm() {
    console.log('burdayim');
    this.editted = true;
    if (this.leadForm.invalid) {
      alert('You must fill the required fields!')
      return;
    };
    // const id = this.save(this.leadForm.value);
    this.updateCustomer = this.leadForm.value;
    console.log(this.leadForm.value);
    this.update(this.leadForm.value);
    // this.store.dispatch(this.update(this.leadForm.value))
    // this.store.updateCustomer(this.id, this.updateCustomer);


    this.leadForm.reset()
    this.editted = false;
  }

}

