import { Injectable } from '@angular/core';
import { CustomerDetail } from '~types/customer-detail';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // private customerDetail: CustomerDetail

  // setData(value){
  //   this.customerDetail = value;
  //   this.customerDetail.id = Date.now()
  // }

  // getData(){
  //   return {...this.customerDetail}
  // }

  constructor() { }
}
