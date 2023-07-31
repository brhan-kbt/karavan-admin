import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  selectedOrder: any | null = null;

  constructor(private order: OrderService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.order.selectedOrder$.subscribe((order) => {
      if (order) {
        this.selectedOrder = order;
        console.log(this.selectedOrder); // This will log the selected order when available
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
    console.log(this.selectedOrder)
  });
}
}
