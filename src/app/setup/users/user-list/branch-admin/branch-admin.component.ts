import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { BranchSeletionFormComponent } from 'src/app/setup/ui-forms/branch-seletion-form/branch-seletion-form.component';
import { ProductFormComponent } from 'src/app/setup/ui-forms/product-form/product-form.component';
import { UserFormComponent } from 'src/app/setup/ui-forms/user-form/user-form.component';
import { VerifyDeleteOrRestoreComponent } from 'src/app/shared/verify-delete-or-restore/verify-delete-or-restore.component';

@Component({
  selector: 'app-branch-admin',
  templateUrl: './branch-admin.component.html',
  styleUrls: ['./branch-admin.component.scss']
})
export class BranchAdminComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email','role','branch', 'phoneNumber','status', 'actions'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:any | undefined;
  isLoading: boolean = true;
  deleteRestoreAction!: string;
  deleteRestoreData: any;
  dataLoaded:boolean=false;

  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private product:ProductService, private user:UserService) {
    this.getUsers();
  }
  async getUsers() {
    try {
      let user = await this.user.getUsers();
      this.users = user.data.filter((res:any) => res.isDeleted === false && (res.role ==='Branch_Admin'));
      console.log('users:',this.users);
      this.dataSource = new MatTableDataSource<any>(this.users);
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(BranchSeletionFormComponent, {
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
    console.log(row)

    const dialogRef = this.dialog.open(BranchSeletionFormComponent, {
       width: '75%',
      data: {
        user:row,
        isEdit: !!row }
    });


   dialogRef.componentInstance.editBranchAdmin.subscribe(user => {
    console.log('Update Id:',user, user.id)

    this.user.updateBranchofAdmin(user).then(res=>{
      console.log('Success', res);
      dialogRef.close();
      this.fetchAndUpdateUsers();
    })

  }, (err:any) => {
    console.log(err);
});

  }


  onStatusButtonClick(data:any){
    console.log(data)
    const userData={
      id:data.id,
      isActive:!data.isActive
    }
    console.log(userData)
    this.user.updateStatus(userData).then(res=>{
      console.log('Success',res);
      this.fetchAndUpdateUsers();
    })
  }
  deleteData(user:any){
    const data ={
      isDeleted:!user.isDeleted,
      id:user.id
    }
    this.deleteRestoreAction='delete';
    this.deleteRestoreData=user;
    const dialogRef = this.dialog.open(VerifyDeleteOrRestoreComponent, {
      data: {
        action: this.deleteRestoreAction,
        data:this.deleteRestoreData
      },
    });    dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      this.deleteUser(data);
    } else {
      console.log(result)
    }
  });
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
    this.users = user.data.filter((res:any) => res.isDeleted === false && (res.role ==='Branch_Admin'));
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
