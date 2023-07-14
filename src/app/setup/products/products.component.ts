import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../ui-forms/product-form/product-form.component';

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

  constructor(private dialog:MatDialog, ) {
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
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
       width: '75%',
      data: { candidate: {} }
    }); 
    dialogRef.componentInstance.save.subscribe(candidate => {
       console.log('====================================');
       console.log(candidate);
       console.log('====================================');
        
      },err=>{
        console.log(err);
        
    });
  }

  openEditDialog(candidate: any): void {
    
    const dialogRef = this.dialog.open(ProductFormComponent, {
       width: '75%',
      data: {   
        candidate:candidate,
        isEdit: !!candidate }
    });
  
    

   dialogRef.componentInstance.save.subscribe(updatedCandidate => {
    console.log('====================================');
    console.log('Updated Product:', updatedCandidate);
    console.log('====================================');
  }, err => {
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
