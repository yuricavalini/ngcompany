import { Product } from '../libs/products/src';

export abstract class ProductsFakeDb {
  public static products: Product[] = [
    {
      id: '1',
      name: 'product-1',
      description: 'description-1',
      richDescription: 'richDescription-1',
      image: 'image-1',
      images: ['image-1-1', 'image-1-2', 'image-1-3'],
      brand: 'brand-1',
      price: 15,
      category: {
        id: '1',
        name: 'category-1',
        icon: 'compass',
        color: '#398888'
      },
      countInStock: 100,
      rating: 5.0,
      numReviews: 15,
      isFeatured: false,
      dateCreated: '2021-09-01'
    },
    {
      id: '2',
      name: 'product-2',
      description: 'description-2',
      richDescription: 'richDescription-2',
      image: 'image-2',
      images: ['image-2-1', 'image-2-2', 'image-2-3'],
      brand: 'brand-2',
      price: 100,
      category: {
        id: '2',
        name: 'category-2',
        icon: 'th-large',
        color: '#000000'
      },
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      isFeatured: true,
      dateCreated: '2024-07-25'
    },
    {
      id: '3',
      name: 'product-3',
      description: 'description-3',
      richDescription: 'richDescription-3',
      image: 'image-3',
      images: ['image-3-1', 'image-3-2', 'image-3-3'],
      brand: 'brand-3',
      price: 50,
      category: {
        id: '3',
        name: 'category-3',
        icon: 'heart',
        color: '#f40000'
      },
      countInStock: 75,
      rating: 3.5,
      numReviews: 50,
      isFeatured: false,
      dateCreated: '2022-11-11'
    }
  ];
}
