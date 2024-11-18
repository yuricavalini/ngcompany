import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@ngcompany/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';

interface OrderStatusListDisplay {
  [key: number]: {
    label: string;
    color: string;
  };
}

const ORDER_STATUS: OrderStatusListDisplay = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  }
};

@Component({
  selector: 'ngadmin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit, OnDestroy {
  protected orders: Order[] = [];
  protected orderStatus = ORDER_STATUS;

  private unsubs$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }

  getOrders() {
    this.ordersService
      .getOrders()
      .pipe(take(1), takeUntil(this.unsubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  deleteOrder(orderId: string) {
    this.ordersService
      .deleteOrder(orderId)
      .pipe(takeUntil(this.unsubs$))
      .subscribe({
        next: () => {
          this.getOrders();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order deleted!'
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order not deleted!'
          });
        }
      });
  }

  confirmDeleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteOrder(orderId);
      },
      reject: () => {}
    });
  }
}
