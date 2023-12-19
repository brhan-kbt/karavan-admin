
  import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { ProductFormComponent } from '../../ui-forms/product-form/product-form.component';
  import { Product } from 'src/app/models/product';
  import { ProductService } from 'src/app/services/product/product.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UpdateAvailablityComponent } from '../../ui-forms/update-availablity/update-availablity.component';
import { AvaialablityService } from 'src/app/services/availablity/avaialablity.service';

  @Component({
    selector: 'app-availablity',
    templateUrl: './availablity.component.html',
    styleUrls: ['./availablity.component.scss']
  })
  export class AvailablityComponent {

    displayedColumns: string[] = ['id', 'productName', 'availablity', 'branchName', 'actions'];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    products:any | undefined;
    isLoading: boolean = true;
    user:any;
    userRole='';
    dataLoaded:boolean=false;

    dataFiltered:any;
    constructor(private dialog:MatDialog,
      private auth:AuthService,
      private availability:AvaialablityService,
      private product:ProductService,     private changeDetectorRef: ChangeDetectorRef,
      ) {
         product.getProducts().then(res=>{
           this.product.cachedProductListObservable$.subscribe(res=>{
             console.log('Obx : ', res.data);
             this.products=res.data;
             this.getAllProds(this.products);
           })
         })

      // this.getProducts();
      this.user = this.auth.getSavedUser();
      console.log(this.user)
      this.userRole=this.user.role
    }

    async getProducts() {
      try {

        let product = await this.product.getProducts();
        this.product.cachedProductListObservable$.subscribe(res=>{
          console.log('Obx : ', res.data);
          this.products=res.data;
          this.getAllProds(this.products);
        })
      //   console.log('Products:',this.products);
      //   const data = this.products.filter((data:any)=>data.branchProducts.length>0);
      //   console.log('By Br-Pr: ', data)


      //   for (const product of data) {
      //     const productName = product.name;
      //     const productId=product.id;
      //     for (const branchProduct of product.branchProducts) {
      //         const branchName = branchProduct.branch.branchName;
      //         const branchId = branchProduct.branch.id;
      //         const id=branchProduct.id;
      //         const isAvailable= branchProduct.isAvailable
      //         const maxThreshold= branchProduct.maxThreshold
      //         const minThreshold=branchProduct.minThreshold
      //         const type= branchProduct.type
      //          productBranchPairs.push({id:id, isAvailable:isAvailable, maxThreshold:maxThreshold, minThreshold:minThreshold, type:type, productName: productName,branchId:branchId, branchName: branchName, productId:productId});
      //     }
      //   }
      //   if(this.userRole=="Branch_Admin"){
      //   this.dataFiltered=productBranchPairs.filter(product=>product.branchId===this.user.branch)
      //   }
      //   else{
      //     this.dataFiltered=productBranchPairs;
      //   }
      //   this.dataSource = new MatTableDataSource<any>(this.dataFiltered);
      // setTimeout(() => {
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // }, 0);

      // this.dataLoaded=true;

      //   console.log("Branch Products",productBranchPairs);
      } catch (error) {
        console.error(error);
      }finally {
        this.isLoading = false; // Move isLoading assignment inside the finally block
      }

    }
    getAllProds(product:any){
      const productBranchPairs = [];

      // this.products=product.data
      console.log('Products:',product);
      const data = this.products.filter((data:any)=>data.branchProducts.length>0);
      console.log('By Br-Pr: ', data)


      for (const product of data) {
        const productName = product.name;
        const productId=product.id;
        for (const branchProduct of product.branchProducts) {
            const branchName = branchProduct.branch.branchName;
            const branchId = branchProduct.branch.id;
            const id=branchProduct.id;
            const isAvailable= branchProduct.isAvailable
            const maxThreshold= branchProduct.maxThreshold
            const minThreshold=branchProduct.minThreshold
            const type= branchProduct.type
             productBranchPairs.push({id:id, isAvailable:isAvailable, maxThreshold:maxThreshold, minThreshold:minThreshold, type:type, productName: productName,branchId:branchId, branchName: branchName, productId:productId});
        }
      }
      if(this.userRole=="Branch_Admin"){
      this.dataFiltered=productBranchPairs.filter(product=>product.branchId===this.user.branch)
      }
      else{
        this.dataFiltered=productBranchPairs;
      }
      this.dataSource = new MatTableDataSource<any>(this.dataFiltered);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 0);

    this.dataLoaded=true;

      console.log("Branch Products",productBranchPairs);
    }
    isButtonDisabled(userRole: string): boolean {
      return userRole === 'Branch_Admin';
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
      const dialogRef = this.dialog.open(UpdateAvailablityComponent, {
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

      const dialogRef = this.dialog.open(UpdateAvailablityComponent, {
         width: '75%',
        data: {
          branchProduct:row,
          isEdit: !!row }
      });



      dialogRef.componentInstance.save.subscribe((data) => {
       console.log('Update Id:', data.id)
        this.availability.updateAvailability(data).then(res=>{
          dialogRef.close();
        })
      console.log(data)
     }, (err:any) => {
       console.log(err);
       dialogRef.componentInstance.isSaving=false;

   });

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

    this.product.updateOrderable(productData).then(res=>{
      console.log(res)
      this.fetchAndUpdateProducts();
    }).catch(err=>{
      console.log(err)
    })
  }


  async fetchAndUpdateProducts() {
    console.log('Here')
    try {
      let product = await this.product.getProds();
      this.products=product.data
      console.log('Products:',this.products);
      this.dataSource = new MatTableDataSource<any>(this.products);
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
