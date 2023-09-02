import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { BranchFormComponent } from 'src/app/setup/ui-forms/branch-form/branch-form.component';
import { ProductFormComponent } from 'src/app/setup/ui-forms/product-form/product-form.component';
import { UserFormComponent } from 'src/app/setup/ui-forms/user-form/user-form.component';

@Component({
  selector: 'app-branchlist',
  templateUrl: './branchlist.component.html',
  styleUrls: ['./branchlist.component.scss']
})
export class BranchlistComponent {

  displayedColumns: string[] = ['id', 'branchName','openingHour','closingHour', 'branchAddress', 'actions'];
  dataSource!: MatTableDataSource<any>;
  dataLoaded:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  branches:any | undefined;
  isLoading: boolean = true;

  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private product:ProductService, private branch:BranchService) {
    this.getUsers();
  }
  async getUsers() {
    try {
      let branch = await this.branch.getAll();
      this.branches=branch.data
      console.log('branches:',this.branches);
      this.dataSource = new MatTableDataSource<any>(this.branches);
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
    const dialogRef = this.dialog.open(BranchFormComponent, {
       width: '60%',
      data: { branch: {} }
    });
     dialogRef.componentInstance.save.subscribe(branch => {
       console.log('Branch',branch);
       this.branch.saveBranch(branch).then(res=>{
        this.fetchAndUpdateBranch()
         console.log(res)
         dialogRef.close();
       })

       },err=>{
         console.log(err);

     });
  }

  openEditDialog(row: any): void {

    const dialogRef = this.dialog.open(BranchFormComponent, {
       width: '60%',
      data: {
        user:row,
        isEdit: !!row }
    });

   dialogRef.componentInstance.save.subscribe((event: { data: any, id?:any }) => {
    console.log('Update Id:', event.id)
    console.log(event.data)
    this.branch.update(event.data, event.id).then(res=>{
      console.log(res);
      this.fetchAndUpdateBranch();
      dialogRef.close();
    })
  }, (err:any) => {
    console.log(err);
});

  }

  deleteData(branch:any){
    if (confirm(`Are you sure you want to delete ${branch.branchName}?`)) {
      this.deleteBranch(branch.id)
  }
}

 deleteBranch(id: any) {
  console.log(id);
  this.branch.deleteBranch(id).subscribe((res:any)=>{
    this.fetchAndUpdateBranch();
  })
}

async fetchAndUpdateBranch() {
  try {
    let branch = await this.branch.getAll();
    this.branches = branch.data;
    console.log('branchs:', this.branches);
    this.dataSource.data = this.branches;
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
