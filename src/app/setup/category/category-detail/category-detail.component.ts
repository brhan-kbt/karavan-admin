import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  selectedCategory :any;
  dataSource!: MatTableDataSource<any>;
  totalProducts:number=0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cat:CategoryService ,private router:Router, private route:ActivatedRoute){

  }

  displayedColumns: string[] = ['id', 'name', 'description', 'totalProducts','status','actions'];

  ngOnInit() {
    this.cat.selectedCategory$.subscribe((cat) => {
      if (cat) {
        this.selectedCategory = cat;
        this.dataSource = new MatTableDataSource<any>(this.selectedCategory.subcategories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalProducts = this.selectedCategory.subcategories.reduce((total:number, sub:any) => {
          return total + sub.products.length;
        }, 0);
        console.log(this.selectedCategory); // This will log the selected order when available
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
      this.totalProducts = this.selectedCategory.subcategories.reduce((total:number, sub:any) => {
        return total + sub.products.length;
      }, 0);

      console.log(this.totalProducts)
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

  showCategorySubCategoryDetails(data:any){
    console.log(data)
    this.cat.setSelectedCategorySubCategory(data);
    this.router.navigate([`category/subcategory/detail/${data.id}`]);
  }
}
