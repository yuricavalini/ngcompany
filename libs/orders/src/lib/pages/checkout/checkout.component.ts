import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@ngcompany/users';
import { CountriesService } from 'data/countries.service';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { CreateOrderDTO } from '../../models/create-order-dto';
import { CreateOrderItem } from '../../models/create-order-item-dto';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CheckoutForm } from './checkout-form';

@Component({
  selector: 'ngcompany-orders-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit, OnDestroy {
  form!: FormGroup<CheckoutForm>;
  isSubmitted = false;
  orderItems: CreateOrderItem[] = [];
  currentUserId: string | null = null;
  countries: { code: string; name: string }[] = [];
  readonly ORDER_INITIAL_STATUS_VALUE = 0;

  private unsubs$ = new Subject<void>();

  constructor(
    private countriesService: CountriesService,
    private ordersService: OrdersService,
    private cartService: CartService,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getCartItems();
    this.createForm();
    this.autoFillUserData();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getCountries() {
    this.countriesService
      .getCountries()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

  private getCartItems() {
    const cart = this.cartService.getCart();

    if (!cart || cart.items.length === 0) {
      this.orderItems = [];
      return;
    }

    this.orderItems = cart.items.map(
      (item) =>
        new CreateOrderItem({
          productId: item.productId,
          quantity: item.quantity
        })
    );
  }

  private createForm() {
    this.form = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      street: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      apartment: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      zip: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      country: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      status: new FormControl(this.ORDER_INITIAL_STATUS_VALUE, {
        nonNullable: true,
        validators: [Validators.required]
      })
    });
  }

  private autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: (user) => {
          if (user) {
            this.currentUserId = user.id;
            this.checkoutForm.name.setValue(user.name);
            this.checkoutForm.email.setValue(user.email);
            this.checkoutForm.street.setValue(user.street);
            this.checkoutForm.apartment.setValue(user.apartment);
            this.checkoutForm.city.setValue(user.city);
            this.checkoutForm.zip.setValue(user.zip);
            this.checkoutForm.country.setValue(user.country);
            this.checkoutForm.phone.setValue(user.phone);
            this.checkoutForm.status.setValue(this.ORDER_INITIAL_STATUS_VALUE);
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not found!'
          });
        }
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.placeOrder();
  }

  private placeOrder() {
    if (!this.currentUserId) return;

    const createOrderDTO = new CreateOrderDTO({
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: this.checkoutForm.status.value,
      userId: this.currentUserId,
      dateOrdered: Date.now().toString()
    });

    this.ordersService
      .createOrder(createOrderDTO)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;
          this.cartService.clearCart();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is created!'
          });

          timer(2000)
            .pipe(takeUntil(this.unsubs$))
            .subscribe(() => {
              this.router.navigate(['/success']);
            });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order not created!'
          });
        }
      });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  get checkoutForm() {
    return this.form.controls;
  }
}
