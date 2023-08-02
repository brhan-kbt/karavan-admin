import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { VerifyDeleteOrRestoreComponent } from 'src/app/shared/verify-delete-or-restore/verify-delete-or-restore.component';
import { MediaFormComponent } from '../../ui-forms/media-form/media-form.component';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent {

  displayedColumns: string[] = ['id', 'imageSrc', 'title','alt', 'actions'];
  dataSource!: MatTableDataSource<any>;
  constructor(private dialog:MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private auth:AuthService, private product:ProductService, private user:UserService) {
    this.getUsers();
  }
  images: any[] | undefined;

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    displayBasic!: boolean;
    selectedImage:any;
    closeGalleria() {
      this.displayBasic = false;
  }
  // Close the galleria when clicked outside the image
  onBackdropClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-galleria')) {
        this.closeGalleria();
    }
}

onGalleriaClick(event: Event) {
  event.stopPropagation();
}

    ngOnInit() {
      this.images=[
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
            alt: 'Description for Image 3',
            title: 'Title 3'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
            alt: 'Description for Image 4',
            title: 'Title 4'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
            alt: 'Description for Image 5',
            title: 'Title 5'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
            alt: 'Description for Image 6',
            title: 'Title 6'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
            alt: 'Description for Image 7',
            title: 'Title 7'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
            alt: 'Description for Image 8',
            title: 'Title 8'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
            alt: 'Description for Image 9',
            title: 'Title 9'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
            alt: 'Description for Image 10',
            title: 'Title 10'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
            alt: 'Description for Image 11',
            title: 'Title 11'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
            alt: 'Description for Image 12',
            title: 'Title 12'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
            alt: 'Description for Image 13',
            title: 'Title 13'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
            alt: 'Description for Image 14',
            title: 'Title 14'
        },
        {
            itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
            thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
            alt: 'Description for Image 15',
            title: 'Title 15'
        }
    ];

    this.selectedImage=this.images;
    console.log(this.images)
    }

    handleImageClicked(event:any){
      console.log(event)
      this.selectedImage=event;

    }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users:any | undefined;
  isLoading: boolean = true;
  deleteRestoreAction!: string;
  deleteRestoreData: any;


  async getUsers() {
    try {
      let user = await this.user.getUsers();
      this.users = user.data.filter((res:any) => res.isDeleted === false && (res.role ==='Admin' || res.role ==='Finance'));
      console.log('users:',this.users);
      this.dataSource = new MatTableDataSource<any>(this.images);
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
    const dialogRef = this.dialog.open(MediaFormComponent, {
       width: '75%',
      data: { candidate: {} }
    });
     dialogRef.componentInstance.save.subscribe(media => {
       console.log('Media',media);
      //  this.auth.saveAdminUser(media).subscribe(res=>{
      //   this.fetchAndUpdateUsers()
      //    console.log(res)
      //  })

       },err=>{
         console.log(err);

     });

  }

  openEditDialog(row: any): void {
    console.log("Here: ",row)

    const dialogRef = this.dialog.open(MediaFormComponent, {
       width: '75%',
      data: {
        user:row,
        isEdit: !!row }
    });


    dialogRef.componentInstance.saveEdit.subscribe((event: { formData: any, id?:any }) => {
      console.log('Update Id:', event.id)
      // this.product.updateProduct(event.formData, event.id).then(res=>{
      //   console.log(res)
      // })
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

