import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { ProductService } from 'src/app/services/product.service';
import { CouponFormComponent } from '../../ui-forms/coupon-form/coupon-form.component';
import { couponType } from 'src/app/constants/couponType';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent {

  displayedColumns: string[] = ['id', 'title','code','customerUsageLimit','startDate','endDate','maxDiscount','minPurchase', 'discountType','discount', 'actions'];
  dataSource!: MatTableDataSource<any>;
  dataLoaded:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  coupons:any | undefined;
  isLoading: boolean = true;
  couponList=couponType;

  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private coupon:CouponService) {
     this.getCoupons();
  }

  async getCoupons() {
    try {
      let coupon = await this.coupon.getAll();
      this.coupons=coupon.data
      console.log('coupons:',this.coupons);
      this.dataSource = new MatTableDataSource<any>(this.coupons);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CouponFormComponent, {
       width: '70%',
      data: { coupon: {} }
    });
      dialogRef.componentInstance.save.subscribe((coupon:any) => {
        console.log('Coupon',coupon);
        this.coupon.saveBranch(coupon).then(res=>{
         this.fetchAndUpdateBranch()
          console.log(res)
          dialogRef.close();
        })

        },(err:any)=>{
          console.log(err);

      });
  }

  openEditDialog(row: any): void {

    const dialogRef = this.dialog.open(CouponFormComponent, {
       width: '70%',
      data: {
        coupon:row,
        isEdit: !!row }
    });

    dialogRef.componentInstance.save.subscribe((coupon: { data: any, id?:any }) => {
     console.log('Update Id:', coupon.id)
     console.log(coupon.data)
     this.coupon.update(coupon.data, coupon.id).then(res=>{
       console.log(res);
       this.fetchAndUpdateBranch();
       dialogRef.close();
     })
   }, (err:any) => {
     console.log(err);
 });

  }

  deleteData(coupon:any){
    if (confirm(`Are you sure you want to delete ${coupon.title}?`)) {
      this.deleteBranch(coupon.id)
  }
}

 deleteBranch(id: any) {
  console.log(id);
  this.coupon.deleteBranch(id).subscribe((res:any)=>{
    this.fetchAndUpdateBranch();
  })
}

async fetchAndUpdateBranch() {
  try {
    let coupon = await this.coupon.getAll();
    this.coupons = coupon.data;
    console.log('coupons:', this.coupons);
    this.dataSource.data = this.coupons;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.changeDetectorRef.detectChanges(); // Manually trigger change detection
  } catch (error) {
    console.error(error);
  } finally {
    this.isLoading = false;
  }
}


getCouponTypeLabel(couponType: number): string {
  const status = this.couponList.find((coupon:any) => coupon.value === couponType);
  return status ? status.label : 'Unknown'; // Default to 'Unknown' if the status is not found.
}
}
