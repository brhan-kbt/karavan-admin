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
import { VerifyDeleteOrRestoreComponent } from 'src/app/shared/verify-delete-or-restore/verify-delete-or-restore.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  displayedColumns: string[] = ['id', 'fullName', 'email','rewardPoints', 'phoneNumber'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // users:any | undefined;
  isLoading: boolean = true;
  deleteRestoreAction!: string;
  deleteRestoreData: any;

  users: any[] = [
    {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
      rewardPoints: 560
    },
    {
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '987-654-3210',
      rewardPoints: 780
    },
    {
      fullName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phoneNumber: '555-123-4567',
      rewardPoints: 320
    },
    {
      fullName: 'Bob Anderson',
      email: 'bob.anderson@example.com',
      phoneNumber: '888-555-1234',
      rewardPoints: 950
    },
    {
      fullName: 'Emily Brown',
      email: 'emily.brown@example.com',
      phoneNumber: '444-789-1234',
      rewardPoints: 180
    },
    {
      fullName: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      phoneNumber: '666-999-5555',
      rewardPoints: 720
    },
    {
      fullName: 'Olivia Davis',
      email: 'olivia.davis@example.com',
      phoneNumber: '111-222-3333',
      rewardPoints: 420
    },
    {
      fullName: 'William Martinez',
      email: 'william.martinez@example.com',
      phoneNumber: '777-888-9999',
      rewardPoints: 620
    },
    {
      fullName: 'Sophia Rodriguez',
      email: 'sophia.rodriguez@example.com',
      phoneNumber: '222-333-4444',
      rewardPoints: 280
    },
    {
      fullName: 'James Taylor',
      email: 'james.taylor@example.com',
      phoneNumber: '999-666-5555',
      rewardPoints: 810
    }
  ];

  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private product:ProductService, private user:UserService) {
    this.getUsers();
  }
  async getUsers() {
    try {
      // let user = await this.user.getUsers();
      // this.users = user.data.filter((res:any) => res.isDeleted === false && (res.role ==='Admin' || res.role ==='Finance'));
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
    console.log(row)

    const dialogRef = this.dialog.open(UserFormComponent, {
       width: '75%',
      data: {
        user:row,
        isEdit: !!row }
    });


   dialogRef.componentInstance.editAdmin.subscribe(user => {
    console.log('Update Id:',user, user.id)

    this.user.updateRole(user).then(res=>{
      console.log('Success', res);
      this.fetchAndUpdateUsers();
      dialogRef.close();
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
    });

    dialogRef.afterClosed().subscribe((result) => {
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
    this.users = user.data.filter((res:any) => res.isDeleted === false && (res.role ==='Admin' || res.role ==='Finance' ));
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
