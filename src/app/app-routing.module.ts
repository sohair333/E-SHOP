import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./presentation/presentation.module').then((m) => m.PresentationModule)
  },
  { path: 'productDetails', loadChildren: () => import('./presentation/product-details/product-details.module').then(m => m.ProductDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
