import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { IngredientFormComponent } from '../../ui-forms/ingredient-form/ingredient-form.component';
import { IngredientProductComponent } from '../../ui-forms/ingredient-product/ingredient-product.component';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  dataLoaded:boolean=false;
  errors:any;
  serverErrors:any;
  isSaving:boolean=false;
  user:any;
  userRole:any;

  constructor(private dialog:MatDialog,
    private auth:AuthService,
    private product:ProductService, private ing:IngredientService,    private changeDetectorRef: ChangeDetectorRef,
    ) {

      this.user = this.auth.getSavedUser();
      console.log(this.user)
      this.userRole=this.user.role
    this.getProducts();
    ing.getIngredients().then(res=>{
      console.log();
    })
  }

  async getProducts() {
    try {
      let product = await this.product.getProducts();
      this.products = product.data;
      console.log('Products:', this.products);
      this.dataSource = new MatTableDataSource<any>(this.products);
       setTimeout(() => {
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       }, 0);

      console.log(this.dataSource)
      this.dataLoaded = true;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
  // ngAfterViewInit() {
  //   console.log('Paginator:', this.paginator); // Check if paginator is defined
  //   console.log('Sort:', this.sort); // Check if sort is defined

  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  //   console.log('DataSource:', this.dataSource); // Check if dataSource is correctly assigned
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addIngredient(row:any):void{
    const dialogRef = this.dialog.open(IngredientProductComponent, {
      width: '75%',
      data: {
        product:row,
      }
   });
   console.log('Logged')
  //  dialogRef.componentInstance.save.subscribe(product => {
  //    console.log('====================================');
  //    console.log('Here');
  //    console.log('====================================');
  //    this.product.saveProduct(product).then(res=>{
  //      console.log(res)
  //    })

  //    },err=>{
  //      console.log(err);

  //  });
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
        console.log(res);
        this.fetchAndUpdateProducts().then(res=>{
          dialogRef.close(); // Close the dialog here
          dialogRef.componentInstance.isSaving=false
        })
      },err=>{
        this.serverErrors = err.error.data; // Assuming the server returns error messages in the "error" property
        dialogRef.componentInstance.serverErrors = err.error.data;
        dialogRef.componentInstance.isSaving=false;
        console.log(this.serverErrors)
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

updateOrderableStatus(row:any){
  console.log(row)
  const productData={
    id:row.id,
    orderable:!row.orderable
  }
  console.log(productData)

  this.product.updateOrderable(productData).then(res=>{
    console.log(res)
    this.fetchAndUpdateProducts();
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
    this.dataLoaded=true;
    this.isLoading = false;
  }
}
}
