import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { ordersRoutes } from './lib.routes';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    BadgeModule,
    ButtonModule,
    InputNumberModule
  ],
  declarations: [CartIconComponent, CartComponent],
  exports: [CartIconComponent, CartComponent]
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
