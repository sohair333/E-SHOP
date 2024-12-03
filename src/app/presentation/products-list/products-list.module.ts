import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { productsListRoutingModule } from './products-list-routing.module';
import { productsListComponent } from './products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FileDragNDropDirective } from 'src/app/shared/directives/dragDrop.directive';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 


@NgModule({
  declarations: [
    productsListComponent,
    FileDragNDropDirective
  ],
  imports: [
    CommonModule,
    productsListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  providers: [DatePipe]
})
export class productsListModule { }
