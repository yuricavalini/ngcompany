import { FormControl } from '@angular/forms';
import { Order } from '@ngcompany/shared';
import { User } from '@ngcompany/users';

type CheckoutUserData = Omit<User, 'id' | 'password' | 'token' | 'isAdmin'>;
type OrderStatusType = Pick<Order, 'status'>;
type CheckoutFormData = CheckoutUserData & OrderStatusType;

export class Checkout implements CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
  status: number;

  constructor({
    name,
    email,
    phone,
    street,
    apartment,
    zip,
    city,
    country,
    status
  }: CheckoutFormData) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.street = street;
    this.apartment = apartment;
    this.zip = zip;
    this.city = city;
    this.country = country;
    this.status = status;
  }
}

export type CheckoutForm = {
  [K in keyof Checkout]: FormControl<Checkout[K]>;
};
