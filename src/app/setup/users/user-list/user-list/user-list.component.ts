import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProductFormComponent } from 'src/app/setup/ui-forms/product-form/product-form.component';
import { UserFormComponent } from 'src/app/setup/ui-forms/user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'phoneNumber','username','role', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:any | undefined;
  isLoading: boolean = true;

  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private product:ProductService, private user:UserService) {
    this.getUsers();
  }
  async getUsers() {
    try {
      let user = await this.user.getUsers();
      this.users=user.data
      console.log('users:',this.users);
      this.dataSource = new MatTableDataSource<any>(this.users);
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
    const dialogRef = this.dialog.open(UserFormComponent, {
       width: '75%',
      data: { candidate: {} }
    }); 
     dialogRef.componentInstance.saveAdmin.subscribe(user => {
       console.log('ADMIN',user);
       this.auth.saveAdminUser(user).subscribe(res=>{
        this.fetchAndUpdateUsers()
         console.log(res)
       })
        
       },err=>{
         console.log(err);
        
     });

     dialogRef.componentInstance.saveFinanceAdmin.subscribe(user => {
      console.log('FINANCE ADMIN',user);
      this.auth.saveFinanceAdminUser(user).then(res=>{
        this.fetchAndUpdateUsers();
        console.log(res)
      })
       
      },err=>{
        console.log(err);
       
    });

    dialogRef.componentInstance.saveBranchAdmin.subscribe(user => {
      console.log('BRANCH ADMIN',user);
      this.auth.saveBranchAdminUser(user).subscribe(res=>{
        this.fetchAndUpdateUsers();
        console.log(res)
      })
       
      },err=>{
        console.log(err);
       
    });
  }

  openEditDialog(row: any): void {
    
    const dialogRef = this.dialog.open(UserFormComponent, {
       width: '75%',
      data: {   
        user:row,
        isEdit: !!row }
    });
  
    

   dialogRef.componentInstance.saveAdmin.subscribe((event: { formData: any, id?:any }) => {
    console.log('Update Id:', event.id)
    this.product.updateProduct(event.formData, event.id).then(res=>{
      console.log(res)
    })
  }, (err:any) => {
    console.log(err);
});

  }
  
  deleteData(user:any){
    if (confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      this.deleteUser(user.id)
  }
}

 deleteUser(id: any) {
  console.log(id);
  this.user.deleteUser(id).subscribe(res=>{
    console.log('====================================');
    console.log(res);
    this.fetchAndUpdateUsers();
    console.log('====================================');
  })
}

async fetchAndUpdateUsers() {
  try {
    let user = await this.user.getUsers();
    this.users = user.data;
    console.log('users:', this.users);
    this.dataSource.data = this.users;
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
