import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ordersRoutes } from './lib.routes';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    ToastModule
  ],
  declarations: [CartIconComponent, CartComponent, OrderSummaryComponent],
  exports: [CartIconComponent, CartComponent, OrderSummaryComponent],
  providers: [MessageService]
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
