import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productsListComponent } from './products-list.component';

const routes: Routes = [
  {
    path: '',
    component: productsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class productsListRoutingModule { }
