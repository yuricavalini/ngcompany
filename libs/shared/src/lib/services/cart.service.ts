import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'cart';
  cart = new BehaviorSubject<Cart | null>(this.getCart());

  constructor() {}

  initCartLocalStorage() {
    const cart = this.getCart();
    if (!cart) {
      this.setCart(new Cart([]));
    }
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();

    if (!cart) {
      return new Cart([cartItem]);
    }

    const cartItemExists = cart.items.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (cartItemExists !== -1) {
      if (updateCartItem) {
        cart.items[cartItemExists].quantity = cartItem.quantity;
      } else {
        cart.items[cartItemExists].quantity =
          cart.items[cartItemExists].quantity + cartItem.quantity;
      }
    } else {
      cart.items.push(cartItem);
    }

    this.setCart(cart);
    this.cart.next(cart);
    return cart;
  }

  getCart(): Cart | null {
    const cartJsonString = localStorage.getItem(this.CART_KEY);
    if (!cartJsonString) return null;

    return JSON.parse(cartJsonString) as Cart;
  }

  clearCart() {
    const cart = new Cart([]);
    this.setCart(cart);
    this.cart.next(cart);
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    if (!cart) return;

    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (cartItemIndex === -1) return;

    cart.items.splice(cartItemIndex, 1);
    this.setCart(cart);
    this.cart.next(cart);
  }

  private setCart(cart: Cart) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }
}
