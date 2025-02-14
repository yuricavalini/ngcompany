import { Route } from '@angular/router';
import { AuthGuard } from '@ngcompany/users';

import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    component: CheckoutComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  }
];
