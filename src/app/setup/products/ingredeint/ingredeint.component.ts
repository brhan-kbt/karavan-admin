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

  displayedColumns: string[] = ['id', 'name', 'code', 'unitPrice','discount','maxThreshold', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products:any | undefined;
  ingredients:any;
  isLoading: boolean = true;
  dataLoaded:boolean=false;
  serverErrors:any;
  isSaving:boolean=false;
  constructor(private dialog:MatDialog,
    private product:ProductService,  private ingredient:IngredientService,   private changeDetectorRef: ChangeDetectorRef,
    ) {
    // this.getProducts();
    this.getIngredients();
  }

  async getProducts() {
    try {
      let product = await this.product.getProducts();
      this.products=product.data
      console.log('Products:',this.products);
      this.dataSource = new MatTableDataSource<any>(this.products);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);

      this.dataLoaded=true;
    } catch (error) {
      console.error(error);
    }finally {
      this.isLoading = false; // Move isLoading assignment inside the finally block
    }

  }

  async getIngredients() {
    try {
      let ingredient = await this.ingredient.getIngredients();
      this.ingredients=ingredient.data
      console.log('Ingredients:',this.ingredients);
       this.dataSource = new MatTableDataSource<any>(this.ingredients);
       setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 0);

      this.dataLoaded=true;
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
        this.fetchAndUpdateIngredients().then(res=>{
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

  deleteData(ingredeint:any){
    if (confirm(`Are you sure you want to delete ${ingredeint.name}?`)) {
      this.deleteUser(ingredeint.id)
  }
}

 deleteUser(id: any) {
  console.log(id);
  this.ingredient.deleteIngredient(id).subscribe(res=>{
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  })
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
    this.fetchAndUpdateIngredients();
  }).catch(err=>{
    console.log(err)
  })
}


async fetchAndUpdateIngredients() {
  console.log('Here')
  try {
    let ingredient = await this.ingredient.getIngs();
    this.ingredients=ingredient.data
    console.log('Ingredients:',this.ingredients);
    console.log('Ingredients:',this.products);
    this.dataSource = new MatTableDataSource<any>(this.ingredients);
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
