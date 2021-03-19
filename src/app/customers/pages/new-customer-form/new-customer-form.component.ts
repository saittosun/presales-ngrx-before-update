import { CustomerFacade } from '~customers/services/customer.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Countries } from '~types/countries';
import { Country } from '~types/country';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-new-customer-form',
  templateUrl: './new-customer-form.component.html',
  styleUrls: ['./new-customer-form.component.scss']
})
export class NewCustomerPageComponent implements OnInit, OnDestroy {

  customername: any;
  id: number;
  leadForm: FormGroup;
  customer: Customer
  // customers: Customer[] = [];
  countries: Country[] = new Countries().countries;
  submitted = false;
  private destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private store: CustomerFacade) { }

  ngOnInit(): void {
    this.createForm();
  }

  // save(val) {
  //   const customer: Customer = {
  //     id: Date.now(),
  //     customerName: val.customerName,
  //     projectName: val.projectName,
  //     status: null,
  //     date: null,
  //     firstName: val.firstName,
  //     lastName: val.lastName,
  //     email: val.email,
  //     phonenumber: val.phonenumber,
  //     vat: val.vat,
  //     address: {
  //       addressline: val.addressline1,
  //       city: val.city,
  //       state: val.state,
  //       country: val.country,
  //       zip: val.zip
  //     },

  //   };
  //   console.log(customer);
  //   this.store.addCustomer(customer)
  //   // this.store.updateCustomer(this.id, customer)
  //   // this.store.saveCustomer(customer);
  //   console.log(customer.id);
  //   return customer.id;
  //   this.customer = customer;
  //   console.log(customer);
  //   console.log(this.customer);
  // }


  private createForm() {
    this.leadForm = this.fb.group({
      customername: new FormControl('', Validators.required),
      addressline1: new FormControl('', Validators.required),
      addressline2: new FormControl(''),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      vat: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      phonenumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit() {
    const customer: Customer = {
      id: Date.now(),
      customername: this.leadForm.value.customername,
      projectname: this.leadForm.value.projectname,
      status: null,
      date: null,
      firstname: this.leadForm.value.firstname,
      lastname: this.leadForm.value.lastname,
      email: this.leadForm.value.email,
      phonenumber: this.leadForm.value.phonenumber,
      vat: this.leadForm.value.vat,
      address: {
        addressline1: this.leadForm.value.addressline1,
        addressline2: this.leadForm.value.addressline2,
        city: this.leadForm.value.city,
        state: this.leadForm.value.state,
        country: this.leadForm.value.country,
        zip: this.leadForm.value.zip
      }
    }
    this.submitted = true;
    if (this.leadForm.invalid) {
      alert('You must fill the required fields!');
      return;
    }

    console.log(customer);
    // this.save(this.customer);
    console.log(this.leadForm.value);
    console.log(this.customer);
    this.store.addCustomer(customer)
    this.router.navigate(['../customer-detail', customer.id], { relativeTo: this.route });
    this.leadForm.reset();
    this.submitted = false;
  }

}
