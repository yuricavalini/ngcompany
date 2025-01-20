import { Route } from '@angular/router';

import { ProductComponent } from './pages/product/product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

export const productsRoutes: Route[] = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryId',
    component: ProductsListComponent
  },
  {
    path: 'products/:productId',
    component: ProductComponent
  }
];
