import { Component, EventEmitter, Input, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss']
})
export class IngredientFormComponent {
  @Input() isEdit = false;
  @Input() product: any = {
    isActive: false,
    maximumThreshold: '',
    discount: '',
    image: '',
    description: '',
    name: '',
    code: '',
    unitPrice: '',
  };

  @Output() savetodatabase = new EventEmitter<any>();
  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedCategoriesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  categoryIdFound:any;

  selectedImage!: File;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<IngredientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private subcat: SubCategoryService
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.product = data.product; // Access the candidate from the passed data
    } else {
      this.product = null;
    }

    console.log('Product:', this.product);

    this.form = this.formBuilder.group({
      isActive: [this.product?.active || false],
      maximumThreshold: [this.product?.maximumThreshold || null],
      discount: [this.product?.discount || null],
      image: [this.product?.image || ''],
      code: [this.product?.code || '', [Validators.required]],
      description: [this.product?.description || '', [Validators.required]],
      name: [this.product?.name || '', [Validators.required]],
      unitPrice: [this.product?.unitPrice || '', [Validators.required]],
    });

    this.getCategories();
    this.getSubCategories();
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

  onCategorySelectionChange(event: any) {
    this.selectedCat = event.value;
    this.getById();

    console.log('Selected Category:', event.value);
  }

  async getById() {
    try {
      let sub = await this.subcat.getById(this.selectedCat);
      this.subCategories = sub;
      console.log('All Sub-Categories:', this.subCategories);

      // Create a new array with only categoryName and categoryId
      this.selectedSubCategoriesField = this.subCategories.map((subCategory: any) => {
        return {
          subCategoryName: subCategory.name,
          id: subCategory.id
        };
      });

      console.log('Selected Sub Categories:', this.selectedSubCategoriesField);
    } catch (error) {
      console.error(error);
    }
  }
  async getSubCategories() {
    try {
      let subcategory = await this.subcat.getAll();
      this.subCategories = subcategory;
      const subCategoryId = this.form.value.subCategoryId;
      const foundCategory = this.subCategories.find((sub: any) => sub.id === subCategoryId);
      this.categoryIdFound = foundCategory?.categoryId || null;
      console.log('Sub Categories:', this.categoryIdFound, this.subCategories);

      // Filter subcategories based on the found categoryId
      this.selectedSubCategoriesField = this.subCategories
        .filter((subCategory: any) => subCategory.categoryId === this.categoryIdFound)
        .map((subCategory: any) => {
          return {
            subCategoryName: subCategory.name,
            id: subCategory.id
          };
        });

      console.log('Selected Sub Categories:', this.selectedSubCategoriesField);

      // Update the categoryId form control value
      this.form.patchValue({
        categoryId: this.categoryIdFound
      });
    } catch (error) {
      console.error(error);
    }
  }


  onSave(): void {
    console.log(this.form.value)
    this.form.markAllAsTouched();
     if (this.form.valid) {
       const formData = new FormData();
       formData.append('isActive', this.form.get('isActive')?.value);
       formData.append('maximumThreshold', this.form.get('maximumThreshold')?.value);
       formData.append('discount', this.form.get('discount')?.value);
       formData.append('image', this.selectedImage as Blob);
       formData.append('code', this.form.get('code')?.value);
       formData.append('description', this.form.get('description')?.value);
       formData.append('name', this.form.get('name')?.value);
       formData.append('unitPrice', this.form.get('unitPrice')?.value);
       if (this.isEdit) {
        console.log('Update')
         this.save.emit({ formData, id: this.product.id });
       } else {
        console.log('Save')

         this.save.emit( formData );
       }
       console.log('Form Data: Valid');
        // this.dialogRef.close();
     } else {
       console.log('Form is invalid');
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
