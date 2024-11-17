import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@ngcompany/users';
import { CountriesService } from 'data/countries.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'ngadmin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {
  protected users: User[] = [];

  private unsubs$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private countriesService: CountriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  getUsers() {
    this.usersService
      .getUsers()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((users) => {
        this.users = users;
      });
  }

  getCountryName(countryCode: string) {
    return this.countriesService.getCountryName(countryCode);
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

  deleteUser(userId: string) {
    this.usersService
      .deleteUser(userId)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.getUsers();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted!'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not deleted!'
          });
        }
      });
  }

  confirmDeleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteUser(userId);
      },
      reject: () => {}
    });
  }
}
