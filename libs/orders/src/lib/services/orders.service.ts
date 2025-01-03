import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@ngcompany/products';
import { map, Observable } from 'rxjs';

import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // apiURLOrders = environment.apiUrl + 'orders';
  apiURLOrders = 'api/orders';
  apiURLProducts = 'api/products';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrdersCount(): Observable<{ ordersCount: number }> {
    return this.http
      .get<Order[]>(this.apiURLOrders)
      .pipe(map((orders) => ({ ordersCount: orders.length })));
  }

  getTotalSales(): Observable<{ totalSales: number }> {
    return this.http.get<Order[]>(this.apiURLOrders).pipe(
      map((orders) => ({
        totalSales: orders.reduce((acc, order) => acc + order.totalPrice, 0)
      }))
    );
  }

  getOrder(orderId: string) {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order) {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStatus: { status: string }, orderId: string) {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string) {
    return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  getProduct(productId: string) {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }
}
