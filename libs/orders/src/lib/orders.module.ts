import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '@ngcompany/shared';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ordersRoutes } from './lib.routes';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule,
    DropdownModule
  ],
  declarations: [
    CartIconComponent,
    CartComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ThankYouComponent
  ],
  exports: [
    CartIconComponent,
    CartComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    ThankYouComponent
  ],
  providers: [MessageService]
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
