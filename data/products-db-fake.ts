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
        id: '3',
        name: 'Computers',
        icon: 'desktop',
        color: '#E1F0E7'
      },
      countInStock: 100,
      rating: 5.0,
      numReviews: 15,
      isFeatured: true,
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
        id: '3',
        name: 'Computers',
        icon: 'desktop',
        color: '#E1F0E7'
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
        id: '4',
        name: 'House',
        icon: 'home',
        color: '#E2E1F0'
      },
      countInStock: 75,
      rating: 3.5,
      numReviews: 50,
      isFeatured: false,
      dateCreated: '2022-11-11'
    },
    {
      id: '4',
      name: 'product-4',
      description: 'description-4',
      richDescription: 'richDescription-4',
      image: 'image-4',
      images: ['image-4-1', 'image-4-2', 'image-4-3'],
      brand: 'brand-4',
      price: 75,
      category: {
        id: '4',
        name: 'House',
        icon: 'home',
        color: '#E2E1F0'
      },
      countInStock: 25,
      rating: 4.0,
      numReviews: 25,
      isFeatured: true,
      dateCreated: '2023-03-03'
    },
    {
      id: '5',
      name: 'product-5',
      description: 'description-5',
      richDescription: 'richDescription-5',
      image: 'image-5',
      images: ['image-5-1', 'image-5-2', 'image-5-3'],
      brand: 'brand-5',
      price: 25,
      category: {
        id: '5',
        name: 'Games',
        icon: 'sun',
        color: '#FFB8B8'
      },
      countInStock: 50,
      rating: 4.0,
      numReviews: 35,
      isFeatured: true,
      dateCreated: '2023-03-03'
    },
    {
      id: '6',
      name: 'product-6',
      description: 'description-6',
      richDescription: 'richDescription-6',
      image: 'image-6',
      images: ['image-6-1', 'image-6-2', 'image-6-3'],
      brand: 'brand-6',
      price: 35,
      category: {
        id: '5',
        name: 'Games',
        icon: 'sun',
        color: '#FFB8B8'
      },
      countInStock: 75,
      rating: 4.0,
      numReviews: 45,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '7',
      name: 'product-7',
      description: 'description-7',
      richDescription: 'richDescription-7',
      image: 'image-7',
      images: ['image-7-1', 'image-7-2', 'image-7-3'],
      brand: 'brand-7',
      price: 45,
      category: {
        id: '5',
        name: 'Games',
        icon: 'sun',
        color: '#FFB8B8'
      },
      countInStock: 100,
      rating: 4.0,
      numReviews: 55,
      isFeatured: true,
      dateCreated: '2023-03-03'
    },
    {
      id: '8',
      name: 'product-8',
      description: 'description-8',
      richDescription: 'richDescription-8',
      image: 'image-8',
      images: ['image-8-1', 'image-8-2', 'image-8-3'],
      brand: 'brand-8',
      price: 55,
      category: {
        id: '5',
        name: 'Games',
        icon: 'sun',
        color: '#FFB8B8'
      },
      countInStock: 125,
      rating: 4.0,
      numReviews: 65,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '9',
      name: 'product-9',
      description: 'description-9',
      richDescription: 'richDescription-9',
      image: 'image-9',
      images: ['image-9-1', 'image-9-2', 'image-9-3'],
      brand: 'brand-9',
      price: 65,
      category: {
        id: '2',
        name: 'Beauty',
        icon: 'palette',
        color: '#F0E8DE'
      },
      countInStock: 150,
      rating: 4.0,
      numReviews: 75,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '10',
      name: 'product-10',
      description: 'description-10',
      richDescription: 'richDescription-10',
      image: 'image-10',
      images: ['image-10-1', 'image-10-2', 'image-10-3'],
      brand: 'brand-10',
      price: 75,
      category: {
        id: '2',
        name: 'Beauty',
        icon: 'palette',
        color: '#F0E8DE'
      },
      countInStock: 175,
      rating: 4.0,
      numReviews: 85,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '11',
      name: 'product-11',
      description: 'description-11',
      richDescription: 'richDescription-11',
      image: 'image-11',
      images: ['image-11-1', 'image-11-2', 'image-11-3'],
      brand: 'brand-11',
      price: 85,
      category: {
        id: '1',
        name: 'Mobile',
        icon: 'mobile',
        color: '#F0E4E1'
      },
      countInStock: 200,
      rating: 4.0,
      numReviews: 95,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '12',
      name: 'product-12',
      description: 'description-12',
      richDescription: 'richDescription-12',
      image: 'image-12',
      images: ['image-12-1', 'image-12-2', 'image-12-3'],
      brand: 'brand-12',
      price: 95,
      category: {
        id: '1',
        name: 'Mobile',
        icon: 'mobile',
        color: '#F0E4E1'
      },
      countInStock: 225,
      rating: 4.0,
      numReviews: 105,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '13',
      name: 'product-13',
      description: 'description-13',
      richDescription: 'richDescription-13',
      image: 'image-13',
      images: ['image-13-1', 'image-13-2', 'image-13-3'],
      brand: 'brand-13',
      price: 105,
      category: {
        id: '1',
        name: 'Mobile',
        icon: 'mobile',
        color: '#F0E4E1'
      },
      countInStock: 250,
      rating: 4.0,
      numReviews: 115,
      isFeatured: false,
      dateCreated: '2023-03-03'
    },
    {
      id: '14',
      name: 'product-14',
      description: 'description-14',
      richDescription: 'richDescription-14',
      image: 'image-14',
      images: ['image-14-1', 'image-14-2', 'image-14-3'],
      brand: 'brand-14',
      price: 115,
      category: {
        id: '1',
        name: 'Mobile',
        icon: 'mobile',
        color: '#F0E4E1'
      },
      countInStock: 275,
      rating: 4.0,
      numReviews: 125,
      isFeatured: true,
      dateCreated: '2023-03-03'
    }
  ];
}
