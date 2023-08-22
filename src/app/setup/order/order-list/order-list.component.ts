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

  constructor(private dialog:MatDialog,private auth:AuthService, private product:ProductService, private router:Router, private order:OrderService,   private changeDetectorRef: ChangeDetectorRef,
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
      let order = await this.order.getOrders();
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
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    } catch (error) {
      console.error(error);
    }finally {
      this.isLoading = false; // Move isLoading assignment inside the finally block
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  updateOrderStatus(row:any){
  console.log(row)
  const orderStatus={
    id:row.id,
    orderStatus:!row.orderStatus,
    approvedBy:this.user.id
  }
  console.log(orderStatus)

  this.order.updateOrder(orderStatus).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
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


}
