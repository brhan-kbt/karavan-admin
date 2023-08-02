import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch/branch.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  @Input() isEdit = false;
  @Input() categoryData: any = {
    name: '',
    description: '',
    image: '',
    isActive:false,
  };

  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedBranchesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  branches:any;

  selectedImage: File | string | null = null;
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.categoryData = data.product; // Access the candidate from the passed data
    } else {
      this.categoryData = null;
    }

    console.log('user:', this.categoryData);

    this.form = this.formBuilder.group({
      name: [this.categoryData?.name || null, [Validators.required]],
      description: [this.categoryData?.description || null],
      image: [this.categoryData?.image || null],
      isActive: [this.categoryData?.isActive || null],
    });

  }

  onSave(): void {
    console.log(this.form.value)
    console.log(this.selectedImage)
    const formData = new FormData();

    this.form.markAllAsTouched();
     if (this.form.valid) {
       formData.append('isActive', this.form.get('isActive')?.value);
       formData.append('name', this.form.get('name')?.value);
       formData.append('description', this.form.get('description')?.value);
       formData.append('image', this.selectedImage as Blob);
     }
     if (this.form.valid) {
      formData.append('isActive', this.form.get('isActive')?.value);
      formData.append('name', this.form.get('name')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('image', this.selectedImage as Blob);
      console.log(this.form.value, this.categoryData.id)
       if(this.isEdit){
         this.save.emit({formData, id:this.categoryData.id});
       }
       else{
        console.log(this.form.value)
         this.save.emit(formData);
       }
   }
   else{
    console.log('Form is invalid');
   }

  }

  handleImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string  | null;
      };
      reader.readAsDataURL(file);
    }
    console.log(this.selectedImage)
  }
}
