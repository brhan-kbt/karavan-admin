import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileFormComponent } from '../../ui-forms/profile-form/profile-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user:any;
  constructor(private auth:AuthService,
    private dialog:MatDialog){
    this.user = auth.getSavedUser();
  }

  openEditDialog(row: any): void {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '75%',
      data: {
        user: row,
        isEdit: !!row
      }
    });

      dialogRef.componentInstance.save.subscribe((event: { formData: any, id?: any }) => {
        console.log('Update Id:', event.id);
        // Assuming you have a service named 'product' to update the product
        // this.product.updateProduct(event.formData, event.id).then(res => {
        //   console.log(res);
        // });
      }, (err: any) => {
        console.log(err);
      });
  }


}
