import { CreateOrderItem } from './create-order-item-dto';

export class CreateOrderDTO {
  orderItems: CreateOrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: number;
  userId: string;
  dateOrdered: string;

  constructor({
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    status,
    userId,
    dateOrdered
  }: CreateOrderDTO) {
    this.orderItems = orderItems;
    this.shippingAddress1 = shippingAddress1;
    this.shippingAddress2 = shippingAddress2;
    this.city = city;
    this.zip = zip;
    this.country = country;
    this.phone = phone;
    this.status = status;
    this.userId = userId;
    this.dateOrdered = dateOrdered;
  }
}
