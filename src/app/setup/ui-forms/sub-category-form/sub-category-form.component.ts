import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch/branch.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent {

  @Input() isEdit = false;
  @Input() categoryData: any = {
    name: '',
    description: '',
    image: '',
    isActive:false,
    categoryId:null,
  };

  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedBranchesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  branches:any;
  selectedCategoriesField:any;

  selectedImage!: File;
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<SubCategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category:CategoryService
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.categoryData = data.product; // Access the candidate from the passed data
    } else {
      this.categoryData = null;
    }
    this.getCategories();

    console.log('user:', this.categoryData);

    this.form = this.formBuilder.group({
      name: [this.categoryData?.name || null, [Validators.required]],
      description: [this.categoryData?.description || null],
      image: [this.categoryData?.image || null],
      isActive: [this.categoryData?.isActive || null],
      categoryId:[this.categoryData?.isActive || null],
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
      formData.append('categoryId', this.form.get('categoryId')?.value);
      formData.append('image', this.selectedImage as Blob);
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

  async getCategories() {
    try {
      let subcategories = await this.category.getAll();
      this.categories = subcategories;



      // Create a new array with only categoryName and categoryId
      this.selectedCategoriesField = this.categories.map((category: any) => {
        return {
          categoryName: category.name,
          id: category.id
        };
      });

      console.log('Categories:', this.selectedCategoriesField);
    } catch (error) {
      console.error(error);
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
}
