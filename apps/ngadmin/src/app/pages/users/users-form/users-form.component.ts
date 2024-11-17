import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@ngcompany/users';
import { CountriesService } from 'data/countries.service';
import { MessageService } from 'primeng/api';
import { Subject, of, switchMap, take, takeUntil, timer } from 'rxjs';

import { UserForm } from './user-form';

@Component({
  selector: 'ngadmin-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit, OnDestroy {
  form!: FormGroup<UserForm>;
  isSubmitted = false;
  editMode = false;
  currentUserId: string | null = null;
  countries: { code: string; name: string }[] = [];

  private unsubs$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private countriesService: CountriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.createForm();
    this.checkEditMode();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  private getCountries() {
    this.countriesService
      .getCountries()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((countries) => {
        this.countries = countries;
      });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl('', {
        nonNullable: true
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        nonNullable: true
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      token: new FormControl('', {
        nonNullable: true
      }),
      isAdmin: new FormControl(false, {
        nonNullable: true
      }),
      street: new FormControl('', {
        nonNullable: true
      }),
      apartment: new FormControl('', {
        nonNullable: true
      }),
      zip: new FormControl('', {
        nonNullable: true
      }),
      city: new FormControl('', {
        nonNullable: true
      }),
      country: new FormControl('', {
        nonNullable: true
      })
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const user = new User({
      id: this.currentUserId || '',
      name: this.userForm.name.value,
      password: this.userForm.password.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      token: this.userForm.token.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    });

    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
  }

  private createUser(user: User) {
    this.usersService
      .createUser(user)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${user.name} is created!`
          });
          timer(2000)
            .pipe(takeUntil(this.unsubs$))
            .subscribe(() => {
              this.location.back();
            });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not created!'
          });
        }
      });
  }

  private updateUser(user: User) {
    this.usersService
      .updateUser(user, this.currentUserId as string)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.form.reset();
          this.isSubmitted = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated!'
          });
          timer(2000)
            .pipe(takeUntil(this.unsubs$))
            .subscribe(() => {
              this.location.back();
            });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not updated!'
          });
        }
      });
  }

  private checkEditMode() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.currentUserId = params['id'] as string;
          if (this.currentUserId) {
            this.editMode = true;
            return this.usersService.getUser(this.currentUserId);
          }
          return of(null);
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.editMode = true;
            this.userForm.id.setValue(user.id);
            this.userForm.name.setValue(user.name);
            this.userForm.password.setValue(user.password);
            this.userForm.email.setValue(user.email);
            this.userForm.phone.setValue(user.phone);
            this.userForm.token.setValue(user.token);
            this.userForm.isAdmin.setValue(user.isAdmin);
            this.userForm.street.setValue(user.street);
            this.userForm.apartment.setValue(user.apartment);
            this.userForm.zip.setValue(user.zip);
            this.userForm.city.setValue(user.city);
            this.userForm.country.setValue(user.country);

            this.userForm.password.setValidators([]);
            this.userForm.password.updateValueAndValidity();
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not found!'
          });
        }
      });
  }

  get userForm() {
    return this.form.controls;
  }
}
