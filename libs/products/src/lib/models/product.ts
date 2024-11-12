import { Category } from './category';

export class Product {
  id: string;
  name: string;
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  brand: string;
  price: number;
  category: Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: string;

  constructor({
    id,
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    dateCreated
  }: Product) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.richDescription = richDescription;
    this.image = image;
    this.images = images;
    this.brand = brand;
    this.price = price;
    this.category = category;
    this.countInStock = countInStock;
    this.rating = rating;
    this.numReviews = numReviews;
    this.isFeatured = isFeatured;
    this.dateCreated = dateCreated;
  }
}
