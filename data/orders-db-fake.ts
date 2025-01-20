import { Order } from "@ngcompany/shared";

export abstract class OrdersFakeDb {
  public static orders: Order[] = [
    {
      id: '1',
      orderItems: [
        {
          id: '1',
          product: { id: '1' } as any,
          quantity: 2
        }
      ],
      shippingAddress1: 'street-1',
      shippingAddress2: 'apartment-1',
      city: 'city-1',
      zip: '50309',
      country: 'US',
      phone: '123456789',
      status: 0,
      totalPrice: 90,
      user: { id: '1' } as any,
      dateOrdered: '2024-08-10'
    },
    {
      id: '2',
      orderItems: [
        {
          id: '1',
          product: { id: '2' } as any,
          quantity: 1
        }
      ],
      shippingAddress1: 'street-2',
      shippingAddress2: 'apartment-2',
      city: 'city-2',
      zip: '50310',
      country: 'US',
      phone: '987654321',
      status: 1,
      totalPrice: 50,
      user: { id: '3' } as any,
      dateOrdered: '2024-11-02'
    },
    {
      id: '3',
      orderItems: [
        {
          id: '1',
          product: { id: '3' } as any,
          quantity: 3
        }
      ],
      shippingAddress1: 'street-3',
      shippingAddress2: 'apartment-3',
      city: 'city-3',
      zip: '50311',
      country: 'US',
      phone: '555666777',
      status: 2,
      totalPrice: 150,
      user: { id: '5' } as any,
      dateOrdered: '2024-09-07'
    },
    {
      id: '4',
      orderItems: [
        {
          id: '1',
          product: { id: '1' } as any,
          quantity: 3
        }
      ],
      shippingAddress1: 'street-3',
      shippingAddress2: 'apartment-3',
      city: 'city-3',
      zip: '50311',
      country: 'US',
      phone: '555666777',
      status: 3,
      totalPrice: 200,
      user: { id: '8' } as any,
      dateOrdered: '2024-10-23'
    },
    {
      id: '5',
      orderItems: [
        {
          id: '1',
          product: { id: '2' } as any,
          quantity: 3
        }
      ],
      shippingAddress1: 'street-3',
      shippingAddress2: 'apartment-3',
      city: 'city-3',
      zip: '50311',
      country: 'US',
      phone: '555666777',
      status: 4,
      totalPrice: 175,
      user: { id: '12' } as any,
      dateOrdered: '2024-01-03'
    }
  ];
}
