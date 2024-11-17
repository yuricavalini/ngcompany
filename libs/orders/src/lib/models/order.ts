import { User } from '@ngcompany/users';
import { OrderItem } from './order-item';

export class Order {
  id: string;
  orderItem: OrderItem;
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: number;
  totalPrice: number;
  user: User;
  dateOrdered: string;

  constructor({
    id,
    orderItem,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    dateOrdered
  }: Order) {
    this.id = id;
    this.orderItem = orderItem;
    this.shippingAddress1 = shippingAddress1;
    this.shippingAddress2 = shippingAddress2;
    this.city = city;
    this.zip = zip;
    this.country = country;
    this.phone = phone;
    this.status = status;
    this.totalPrice = totalPrice;
    this.user = user;
    this.dateOrdered = dateOrdered;
  }
}
