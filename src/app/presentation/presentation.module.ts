import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../core/layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'productsList',
        pathMatch: 'full',
      },
      {
        path: 'productsList',
        loadChildren: () =>
          import('./products-list/products-list.module').then((m) => m.productsListModule),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('./favourites/favourites.module').then((m) => m.FavouritesModule),
      }, {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
      }, {
        path: 'PorductItem',
        loadChildren: () =>
          import('./product-details/product-details.module').then((m) => m.ProductDetailsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ],
})
export class PresentationModule { }
