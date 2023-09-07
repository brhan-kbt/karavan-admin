import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderStatuses } from 'src/app/constants/orderStatus';
import { formatTitle } from 'src/app/helpers/helpers';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  selectedOrder: any | null = null;

  constructor(private order: OrderService, private route:ActivatedRoute) {}

  productNames!:any;
  ngOnInit() {
    this.order.selectedOrder$.subscribe((order) => {
      if (order) {
        this.selectedOrder = order;
        this.productNames = this.selectedOrder.orderDetails.map((orderDetail:any) => orderDetail);

        console.log(this.productNames); // This will log the selected order when available
      } else {
        this.route.paramMap.subscribe((params) => {
          const orderId = params.get('id');
          if (orderId) {
            this.getOrder(orderId);
          }
        });
      }
    });
  }
async getOrder(id:any){
  this.order.getById(id).then(res=>{
    this.selectedOrder=res;
     this.productNames = this.selectedOrder.orderDetails.map((orderDetail:any) => orderDetail);
      this.selectedOrder.orderDetails.map((orderDetail:any) => console.log(orderDetail.product.name));

    console.log(this.productNames)
  });
}

formatTitle(text:any){
  return formatTitle(text);
}
orderStats=orderStatuses;

getOrderStatusLabel(orderStatus: number): string {
  const status = this.orderStats.find(status => status.value === orderStatus);
  return status ? status.label : 'Unknown'; // Default to 'Unknown' if the status is not found.
}

getOrderStatusStyle(orderStatus: number): any {
  const style: any = {};
  const status = orderStatuses.find(status => status.value === orderStatus);

  if (status) {
    switch (status.value) {
      case 0:
        style.color = '#f44336'; // Red color for Pending
        break;
      case 1:
        style.color = '#4caf50'; // Green color for Confirmed
        break;
      case 2:
        style.color = '#ffc107'; // Amber color for InProgress
        break;
      case 3:
        style.color = '#3f51b5'; // Blue color for ReadyForPickUp
        break;
      case 4:
        style.color = '#009688'; // Teal color for Completed
        break;
      case 5:
        style.color = '#9e9e9e'; // Grey color for Cancelled
        break;
      case 26:
        style.color = '#ff5722'; // Deep Orange color for Refunded
        break;
      default:
        break;
    }
  }

  return style;
}

}
