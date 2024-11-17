import { FormControl } from '@angular/forms';
import { User } from '@ngcompany/users';

export type UserForm = {
  [K in keyof User]: FormControl<User[K]>;
};
