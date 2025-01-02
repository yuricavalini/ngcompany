import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';
  cart$ = new BehaviorSubject<Cart | null>(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart = this.getCart();
    if (!cart) {
      this.setCart(new Cart([]));
    }
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    if (!cart) {
      return new Cart([cartItem]);
    }

    const cartItemExists = cart.items.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (cartItemExists !== -1) {
      cart.items[cartItemExists].quantity = cart.items[
        cartItemExists
      ].quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }

    this.setCart(cart);
    this.cart$.next(cart);
    return cart;
  }

  getCart(): Cart | null {
    const cartJsonString = localStorage.getItem(this.CART_KEY);
    if (!cartJsonString) return null;

    return JSON.parse(cartJsonString) as Cart;
  }

  removeCart() {
    localStorage.removeItem(this.CART_KEY);
  }

  private setCart(cart: Cart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
}
