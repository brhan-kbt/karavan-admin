import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  displayedColumns: string[] = ['id', 'productName', 'productCode', 'productPrice','discount','orderable', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products:any | undefined;
  isLoading: boolean = true;

  constructor(private dialog:MatDialog, private product:ProductService) {
    this.getProducts();
  }

  async getProducts() {
    try {
      let product = await this.product.getProducts();
      this.products=product.data
      console.log('Products:',this.products);
      this.dataSource = new MatTableDataSource<any>(this.products);
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

  
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
       width: '75%',
      data: { candidate: {} }
    }); 
    console.log('Logged')
    dialogRef.componentInstance.save.subscribe(product => {
      console.log('====================================');
      console.log('Here');
      console.log('====================================');
      this.product.saveProduct(product).then(res=>{
        console.log(res)
      })
        
      },err=>{
        console.log(err);
        
    });
  }

  openEditDialog(row: any): void {
    
    const dialogRef = this.dialog.open(ProductFormComponent, {
       width: '75%',
      data: {   
        product:row,
        isEdit: !!row }
    });
  
    

   dialogRef.componentInstance.save.subscribe((event: { formData: any, id?:any }) => {
    console.log('Update Id:', event.id)
    this.product.updateProduct(event.formData, event.id).then(res=>{
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
}
