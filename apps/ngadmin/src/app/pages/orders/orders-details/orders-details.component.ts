import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@ngcompany/orders';
import { MessageService } from 'primeng/api';
import { of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'ngadmin-orders-details',
  templateUrl: './orders-details.component.html'
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {
  isSubmitted = false;
  currentOrderId: string | null = null;
  order: Order | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  getOrder() {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.currentOrderId = params['id'] as string;
          if (this.currentOrderId) {
            return this.ordersService.getOrder(this.currentOrderId);
          }
          return of(null);
        }),
        takeUntil(this.unsubs$)
      )
      .subscribe({
        next: (order) => {
          this.order = order;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order not found'
          });
        }
      });
  }
}
