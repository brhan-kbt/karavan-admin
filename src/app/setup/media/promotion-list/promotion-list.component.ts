import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { VerifyDeleteOrRestoreComponent } from 'src/app/shared/verify-delete-or-restore/verify-delete-or-restore.component';
import { MediaFormComponent } from '../../ui-forms/media-form/media-form.component';
import { GalleryService } from 'src/app/services/Gallery/gallery.service';
import { PromoFormComponent } from '../../ui-forms/promo-form/promo-form.component';
import { ProductService } from 'src/app/services/product/product.service';
import { PromotionService } from 'src/app/services/promotion/promotion.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent {

    dataLoaded:boolean=false;
    displayedColumns: string[] = ['id', 'imageSrc', 'title','alt', 'actions'];
    dataSource!: MatTableDataSource<any>;
    galleries:any;
    errMessage!:string;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(private dialog:MatDialog,
      private changeDetectorRef: ChangeDetectorRef,
      private media: PromotionService,
      private product:ProductService,
      private user:UserService) {


        media.getImages().then(res=>{
        this.galleries=res;
        console.log('Galleries:',this.galleries);
        this.dataSource = new MatTableDataSource<any>(this.galleries);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
        this.dataLoaded=true;
        console.log('Gallery', res)
       },err=>{
        this.errMessage=err.error.message;
        console.log(err);

       })

       product.getProducts().then(res=>{
        console.log('Products Loaded!')
       })
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



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    openDialog(): void {
      const dialogRef = this.dialog.open(PromoFormComponent, {
         width: '75%',
        data: { promo: {} }
      });
       dialogRef.componentInstance.save.subscribe(media => {
         console.log('Media',media);

          this.media.savePromotion(media).then(res=>{
          //  this.fetchAndUpdateUsers()
            console.log(res)
          })

         },err=>{
           console.log(err);

       });

    }

    openEditDialog(row: any): void {
      console.log("Here: ",row)

      const dialogRef = this.dialog.open(PromoFormComponent, {
         width: '75%',
        data: {
          promo:row,
          isEdit: !!row }
      });


      dialogRef.componentInstance.saveEdit.subscribe((event: { formData: any, id?:any }) => {
        console.log('Update Id:', event.id)
         this.media.updatePromotion(event.formData, event.id).then(res=>{
           console.log(res)
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
      })
    }
    deleteData(data:any){
      console.log(data)
    }

   deleteUser(id: any) {
    console.log(id);
    this.user.deleteUser(id).subscribe(res=>{
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
  }




  }