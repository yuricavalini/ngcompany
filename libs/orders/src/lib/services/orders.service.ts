import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // apiURLOrders = environment.apiUrl + 'orders';
  apiURLOrders = 'api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string) {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(orderData: FormData) {
    return this.http.post<Order>(this.apiURLOrders, orderData);
  }

  updateOrder(orderData: FormData, orderId: string) {
    return this.http.put<Order>(
      `${this.apiURLOrders}/${orderId}`,
      orderData
    );
  }

  deleteOrder(orderId: string) {
    return this.http.delete<Order>(`${this.apiURLOrders}/${orderId}`);
  }
}
