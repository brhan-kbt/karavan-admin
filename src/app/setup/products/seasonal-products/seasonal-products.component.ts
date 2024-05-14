import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { SeasolProductComponent } from '../../ui-forms/seasol-product/seasol-product.component';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-seasonal-products',
  templateUrl: './seasonal-products.component.html',
  styleUrls: ['./seasonal-products.component.scss']
})
export class SeasonalProductsComponent {
  displayedColumns: string[] = ['id', 'productName', 'productCode', 'productPrice','discount','remove'];
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
  selectedType: number;
  popularityForm!:FormGroup;



  constructor(private dialog:MatDialog,
    private auth:AuthService,
    private product:ProductService,
    private fb:FormBuilder,
    private ing:IngredientService,
      private changeDetectorRef: ChangeDetectorRef,
    ) {

     this.popularityForm = this.fb.group({
        popularityType: 0
      })

      this.selectedType = 0;


      product.cachedSeasonalProductListObservable$.subscribe(res=>{
        console.log('New Seasonal Product List : ', res);

        const mergedArray = res.data ? ([] as any[]).concat(...Object.values(res.data)):[];
        this.products = mergedArray;

        console.log(' Seasonal Products:', this.products);
        this.dataSource = new MatTableDataSource<any>(this.products);
         setTimeout(() => {
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
         }, 0);

        console.log(this.dataSource)
        this.dataLoaded = true;
      })
      this.user = this.auth.getSavedUser();
      console.log(this.user)
      this.userRole=this.user.role
      this.getSeasonalProducts();



  }

  onTypeSelectionChange(value: number) {
    this.selectedType = value;


  }
  ngOnInit(){

  }

  changePopularType() {
    this.selectedType = 0;
    console.log('====================================');
    console.log(this.popularityForm.value);
    console.log('====================================');
    this.product.changePopularityType(this.popularityForm.value).subscribe(res=>{
      console.log(res)
     })
  }
  async getSeasonalProducts() {
    try {
      let product = await this.product.getSeasonalProducts();

    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SeasolProductComponent, {
       width: '75%',
      data: { candidate: {} }
    });
    console.log('Logged')
    dialogRef.componentInstance.save.subscribe(product => {
      console.log('====================================');
      console.log('Here');
      console.log('====================================');
      this.product.saveSeasonalProduct(product).then(res=>{
        console.log(res);
        dialogRef.close();
        this.fetchAndUpdateSeasonalProducts();
        // this.fetchAndUpdateProducts().then(res=>{
        //   dialogRef.close(); // Close the dialog here
        //   dialogRef.componentInstance.isSaving=false
        // })
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
      dialogRef.close();
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

updateSeasonalStatus(row:any){
  console.log(row)
  const productData={
    id:row.id,
  }
  console.log(productData)

  this.product.deleteSeasonalProduct(row.id).subscribe(res=>{
    console.log(res)
    this.fetchAndUpdateSeasonalProducts();
  }, err=>{
    console.log(err)
  })
}


async fetchAndUpdateSeasonalProducts() {
  try {
    let prod = await this.product.getSeasonalProducts();
    this.product.cachedSeasonalProductListObservable$.subscribe((res:any)=>{
      console.log('New Seasonal Product List : ', res);
      const mergedArray = ([] as any[]).concat(...Object.values(res.data));
      this.products = mergedArray;
      console.log(' Seasonal Products:', this.products);
      this.dataSource = new MatTableDataSource<any>(this.products);
       setTimeout(() => {
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
       }, 0);

      console.log(this.dataSource)
      this.dataLoaded = true;
    })

    this.changeDetectorRef.detectChanges();
  } catch (error) {
    console.error(error);
  } finally {
    this.dataLoaded=true;
    this.isLoading = false;
  }
}
}
