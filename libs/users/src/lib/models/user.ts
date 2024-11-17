export class User {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  token: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;

  constructor({
    id,
    name,
    password,
    email,
    phone,
    token,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country
  }: User) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.token = token;
    this.isAdmin = isAdmin;
    this.street = street;
    this.apartment = apartment;
    this.zip = zip;
    this.city = city;
    this.country = country;
  }
}
