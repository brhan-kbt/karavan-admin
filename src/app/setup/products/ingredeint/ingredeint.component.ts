import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { IngredientFormComponent } from '../../ui-forms/ingredient-form/ingredient-form.component';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredeint',
  templateUrl: './ingredeint.component.html',
  styleUrls: ['./ingredeint.component.scss']
})
export class IngredeintComponent {

  displayedColumns: string[] = ['id', 'productName', 'productCode', 'productPrice','discount','orderable', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products:any | undefined;
  isLoading: boolean = true;

  constructor(private dialog:MatDialog, private product:ProductService,  private ingredient:IngredientService,   private changeDetectorRef: ChangeDetectorRef,
    ) {
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
    const dialogRef = this.dialog.open(IngredientFormComponent, {
       width: '75%',
      data: { candidate: {} }
    });
    console.log('Logged')
    dialogRef.componentInstance.save.subscribe(product => {
      console.log('====================================');
      console.log('Here');
      console.log('====================================');
      this.ingredient.saveIngredient(product).then(res=>{
        console.log("Here",res)
      })

      },err=>{
        console.log(err);

    });
  }

  openEditDialog(row: any): void {

    const dialogRef = this.dialog.open(IngredientFormComponent, {
       width: '75%',
      data: {
        product:row,
        isEdit: !!row }
    });



   dialogRef.componentInstance.save.subscribe((event: { formData: any, id?:any }) => {
    console.log('Update Id:', event.id)
    this.ingredient.updateIngredient(event.formData, event.id).then(res=>{
      console.log("Here",res)
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
    this.isLoading = false;
  }
}
}
