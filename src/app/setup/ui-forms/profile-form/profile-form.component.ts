import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  @Output() save = new EventEmitter<any>();

  userData:any;
  isEdit:any;
  form!:FormGroup;
  selectedImage!:File;
  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = data.isEdit;
    this.userData=data.user
    console.log('Selected:', this.userData)


    this.form = this.formBuilder.group({
      fullName: [this.userData?.fullName || ''],
      email: [this.userData?.email || null, [Validators.required]],
      phoneNumber: [this.userData?.phoneNumber || null, [Validators.required]],
      branch: [this.userData?.branch || null, [Validators.required]],
      image: [this.userData?.image || null, [Validators.required]],
    });

  }



  onSave(): void {
    if (this.form.valid) {
      const data = {
        id:this.userData.id,
        branchId:this.form.value.branchId
      }
      this.save.emit(data);
    }
  }

  selectedImagePreview: string | undefined;

  handleImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  validateInput(inputElement: HTMLInputElement) {
    const value = parseInt(inputElement.value);
    if (!isNaN(value) && (value < 1 || value > 60)) {
      inputElement.setCustomValidity('Invalid value');
    } else {
      inputElement.setCustomValidity('');
    }
  }
}
