import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService, ProductsService } from '@ngcompany/shared';
import { UsersService } from '@ngcompany/users';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'ngadmin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  statistics: {
    usersCount: number;
    productsCount: number;
    ordersCount: number;
    totalSales: number;
  } | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.usersService.getUsersCount(),
      this.productsService.getProductsCount(),
      this.ordersService.getOrdersCount(),
      this.ordersService.getTotalSales()
    ])
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((values) => {
        this.statistics = {
          usersCount: values[0].usersCount,
          productsCount: values[1].productsCount,
          ordersCount: values[2].ordersCount,
          totalSales: values[3].totalSales
        };
      });
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }
}
