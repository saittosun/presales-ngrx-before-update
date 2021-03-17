import { CustomerFacade } from '~customers/services/customer.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lead-follow-up';

  constructor(private store: CustomerFacade) {}

  ngOnInit(): void {
    this.store.selectAll();
  }
}
