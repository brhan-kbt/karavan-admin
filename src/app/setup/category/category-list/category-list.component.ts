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
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryFormComponent } from '../../ui-forms/category-form/category-form.component';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'status','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products:any | undefined;
  categories:any;
  orders:any | undefined;
  isLoading: boolean = true;

  constructor(private dialog:MatDialog,private cat:CategoryService, private product:ProductService, private router:Router, private order:OrderService,   private changeDetectorRef: ChangeDetectorRef,
    ) {
    this.getCategories();
  }

  async getCategories(){
    try {
      let category = await this.cat.getAll();
      this.categories=category;
      console.log('Categories:',this.categories);
        this.dataSource = new MatTableDataSource<any>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    } catch (error) {
      console.error(error);
    }finally {
      this.isLoading = false; // Move isLoading assignment inside the finally block
    }
  }

  async getOrders(){
    try {
      let order = await this.order.getOrders();
      this.orders=order.data
      console.log('Orders:',this.orders);
       this.dataSource = new MatTableDataSource<any>(this.orders);
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


  updateCategoryStatus(row:any){
  console.log(row)
  const productData={
    id:row.id,
    isActive:!row.isActive
  }
  console.log(productData)

  this.cat.updateCatStatus(productData).then(res=>{
    console.log(res)
    this.fetchAndUpdateProducts();
  }).catch(err=>{
    console.log(err)
  })
}

openDialog(): void {
  const dialogRef = this.dialog.open(CategoryFormComponent, {
     width: '75%',
    data: { candidate: {} }
  });
  console.log('Logged')
  dialogRef.componentInstance.save.subscribe(data => {
    console.log('====================================');
    console.log('Here');
    console.log('====================================');
    this.cat.saveCategory(data).then(res=>{
      console.log(res)
    })
    },err=>{
      console.log(err);
  });
}

openEditDialog(row: any): void {

  const dialogRef = this.dialog.open(CategoryFormComponent, {
     width: '75%',
    data: {
      product:row,
      isEdit: !!row }
  });



 dialogRef.componentInstance.save.subscribe((event: { formData: any, id?:any }) => {
  console.log('Update Id:', event.id)
  this.cat.updateCategory(event.formData, event.id).then(res=>{
    console.log(res)
  })
}, (err:any) => {
  console.log(err);
});

}

deleteData(candidate:any){
  if (confirm(`Are you sure you want to delete ${candidate.name}?`)) {
  console.log('====================================');
  console.log('Send Delete Request');
  console.log('====================================');
}
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


showCategoryDetails(data:any){
  this.cat.setSelectedCategory(data);
  this.router.navigate([`category/detail/${data.id}`]);
}
}
