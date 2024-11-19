import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@ngcompany/orders';
import { MessageService } from 'primeng/api';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'ngadmin-orders-details',
  templateUrl: './orders-details.component.html'
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {
  currentOrderId: string | null = null;
  order: Order | null = null;
  orderStatuses: { id: string; label: string }[] = [];
  selectedStatus: string | null = null;

  private unsubs$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mapOrderStatuses();
    this.getOrder();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  onStatusChange(event: DropdownChangeEvent) {
    if (!this.currentOrderId) return;
    if (!this.order) return;

    this.ordersService
      .updateOrder({ status: event.value }, this.currentOrderId)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order status updated!'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order status not updated!'
          });
        }
      });
  }

  private mapOrderStatuses() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      const keyAsNumber = this.safeStringToNumber(key);
      return {
        id: key,
        label:
          keyAsNumber !== null ? ORDER_STATUS[keyAsNumber].label : 'Undefined'
      };
    });
  }

  private getOrder() {
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
          if (order) {
            this.order = order;
            this.selectedStatus = String(order.status);
          }
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

  private isNumeric(value: unknown): boolean {
    return /^-?\d+(\.\d+)?$/.test(String(value).trim());
  }

  private safeStringToNumber(value: unknown): number | null {
    return this.isNumeric(value) ? Number(value) : null;
  }
}
