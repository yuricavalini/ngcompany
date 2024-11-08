import { Route } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsListComponent,
  }
];
