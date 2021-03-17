import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadDetailComponent } from './leads/lead-detail/lead-detail.component';
import { LeadsComponent } from './leads/leads.component';
import { NewLeadFormComponent } from './leads/new-lead-form/new-lead-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'leads/new-lead-form', component: NewLeadFormComponent },
  { path: 'leads/:id', component: LeadDetailComponent },
  { path: 'leads/edit', component: LeadDetailComponent },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then((mod) => mod.CustomersModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
