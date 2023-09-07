import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { orderStatuses } from 'src/app/constants/orderStatus';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  displayedColumns: string[] = ['orderCode', 'orderType', 'totalItems', 'orderPrice','orderDate','pickUpDate','status', 'actions'];
  displayedColumns2: string[] = ['orderCode', 'branch', 'totalItems', 'orderPrice','approvedBy','pstatus','status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products:any | undefined;
  orders:any | undefined;
  isLoading: boolean = true;
  dataLoaded:boolean=false;
  user:any;
  userRole:any;

  statusColors: { [key: number]: string } = {
    0: '#4caf50', // Green for Done
    1: '#f44336', // Red for Pending
    2: '#ffc107', // Amber for InProgress
    3: '#3f51b5', // Blue for ReadyForPickUp
    4: '#009688', // Teal for Completed
    5: '#9e9e9e', // Grey for Cancelled
    6: '#ff5722', // Deep Orange for Refunded
    // ... add more mappings here
  };

  orderStats:any;

  constructor(private dialog:MatDialog,private auth:AuthService,

    private messageService:MessageService,
    private product:ProductService, private router:Router, private order:OrderService,   private changeDetectorRef: ChangeDetectorRef,
    ) {
      this.user = this.auth.getSavedUser();
      console.log(this.user)
      this.userRole=this.user.role
      this.getOrders();
      this.orderStats=orderStatuses;
      console.log(this.orderStats)

  }

  async getOrders(){
    try {
      await this.order.getOrders().then(order=>{
        this.orders=order.data;
        let filteredOrder:any=[];
        if(this.userRole==='Branch_Admin'){
           filteredOrder = this.orders.filter((o:any)=>o.branch.id===this.user.branch);
        }

        else if(this.userRole==='Admin'){
           filteredOrder = this.orders;
        }


        console.log('Orders:',this.orders);
         this.dataSource = new MatTableDataSource<any>(filteredOrder);
         setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);

       console.log(this.dataSource)
       this.dataLoaded = true;
      })
    } catch (error) {
      console.error(error);
    }finally {
      this.isLoading = false; // Move isLoading assignment inside the finally block
    }
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isUpdating: boolean = false;


  updateOrderStatus(row: any) {
    this.isUpdating = true; // Set isUpdating to true when update starts

    console.log(row);
    const orderStatus = {
      id: row.id,
      orderStatus: row.orderStatus,
      approvedBy: this.user.id
    };
    console.log(orderStatus);

    this.order.updateOrder(orderStatus).then(res => {
      this.isUpdating = false; // Set isUpdating to false when update finishes

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order Status Updated Successfully.',
      });
      console.log(res);
    }).catch(err => {
      this.isUpdating = false; // Set isUpdating to false on error

      console.log(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something Went Wrong.',
      });
    });
  }



async fetchAndUpdateProducts() {
  console.log('Here')
  try {
    let product = await this.product.getProds();
    this.products=product.data
    console.log('Products:',this.products);
    this.dataSource = new MatTableDataSource<any>(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges(); // Manually trigger change detection
  } catch (error) {
    console.error(error);
  } finally {
    this.isLoading = false;
  }
}


showProductDetails(data:any){
  this.order.setSelectedOrder(data);
  this.router.navigate([`order/detail/${data.id}`]);
}

getSelectStyle(orderStatus: number, selectedStatus: number): any {
  const style: any = {};

  switch (orderStatus) {
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
    case 6:
      style.color = '#ff5722'; // Deep Orange color for Refunded
      break;
    default:
      break;
  }

  return style;
}

getOrderStatusLabel(orderStatus: number): string {
  const status = this.orderStats.find((status:any) => status.value === orderStatus);
  return status ? status.label : 'Unknown'; // Default to 'Unknown' if the status is not found.
}


getPaymentStatusStyle(paymentStatus: boolean): any {
  const style: any = {};

  if (paymentStatus) {
    style.color = 'green'; // Green for Success
  } else {
    style.color = 'red'; // Red for Pending
  }

  return style;
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
