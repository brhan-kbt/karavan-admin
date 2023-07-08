import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const data = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 4, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 5, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 6, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 7, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 8, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 9, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
      { id: 10, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' }
    ];

    this.dataSource = new MatTableDataSource<any>(data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteData(candidate:any){
   
  }
  openEditDialog(candidate: any): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
 

     
  }
}
