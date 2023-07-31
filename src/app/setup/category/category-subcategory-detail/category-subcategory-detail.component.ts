import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';

@Component({
  selector: 'app-category-subcategory-detail',
  templateUrl: './category-subcategory-detail.component.html',
  styleUrls: ['./category-subcategory-detail.component.scss']
})
export class CategorySubcategoryDetailComponent {
  selectedCategory :any;
  displayedColumns: string[] = ['id', 'productName', 'productCode', 'productPrice','discount','orderable', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cat:CategoryService , private dialog:Dialog, private route:ActivatedRoute){

  }


  ngOnInit() {
    this.cat.selectedCategorySubCategory$.subscribe((cat) => {
      if (cat) {
        this.selectedCategory = cat;
        this.dataSource = new MatTableDataSource<any>(this.selectedCategory.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Good:",this.selectedCategory); // This will log the selected order when available
      } else {
        this.route.paramMap.subscribe((params) => {
          const categoryId = params.get('id');
          if (categoryId) {
           this.getCategory(categoryId);
            console.log(categoryId)
          }
        });
      }
    });
  }
  async getCategory(id:any){
    this.cat.getById(id).then(res=>{
      this.selectedCategory=res;
      this.dataSource = new MatTableDataSource<any>(this.selectedCategory.subcategories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // Assuming you have an array of subcategories under the selectedCategory
    });
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
    // dialogRef.componentInstance.save.subscribe(product => {
    //   console.log('====================================');
    //   console.log('Here');
    //   console.log('====================================');
    //   this.product.saveProduct(product).then(res=>{
    //     console.log(res)
    //   })

    //   },err=>{
    //     console.log(err);

    // });
  }

  openEditDialog(row: any): void {

    const dialogRef = this.dialog.open(ProductFormComponent, {
       width: '75%',
      data: {
        product:row,
        isEdit: !!row }
    });



//    dialogRef.componentInstance.save.subscribe((event: { formData: any, id?:any }) => {
//     console.log('Update Id:', event.id)
//     this.product.updateProduct(event.formData, event.id).then(res=>{
//       console.log(res)
//     })
//   }, (err:any) => {
//     console.log(err);
// });

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

  // this.product.updateOrderable(productData).then(res=>{
  //   console.log(res)
  //   this.fetchAndUpdateProducts();
  // }).catch(err=>{
  //   console.log(err)
  // })
}


async fetchAndUpdateProducts() {
  console.log('Here')
  // try {
  //   let product = await this.product.getProds();
  //   this.products=product.data
  //   console.log('Products:',this.products);
  //   this.dataSource = new MatTableDataSource<any>(this.products);
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  //   this.changeDetectorRef.detectChanges(); // Manually trigger change detection
  // } catch (error) {
  //   console.error(error);
  // } finally {
  //   this.isLoading = false;
  // }
}
}
