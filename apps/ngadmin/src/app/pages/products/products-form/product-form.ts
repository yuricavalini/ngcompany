import { FormControl } from '@angular/forms';

export interface ProductForm {
  id: FormControl<string>;
  name: FormControl<string>;
  description: FormControl<string>;
  richDescription: FormControl<string>;
  image: FormControl<string>;
  // image: FormControl<File>;
  // images: FormControl<string[]>;
  brand: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
  countInStock: FormControl<number>;
  // rating: FormControl<number>;
  // numReviews: FormControl<number>;
  isFeatured: FormControl<boolean>;
  dateCreated: FormControl<string>;
}
