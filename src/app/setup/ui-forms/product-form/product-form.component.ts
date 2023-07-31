import { Component, EventEmitter, Input, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() isEdit = false;
  @Input() product: any = {
    isActive: false,
    averageQueueDay: '',
    averageQueueTimeHour: '',
    averageQueueTineMinute: '',
    orderable:false,
    discount: '',
    image: '',
    description: '',
    name: '',
    code: '',
    point: '',
    subCategoryId: '',
    tag: '',
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

  selectedImage: File | string | null = null;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
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
      averageQueueDay: [this.product?.averageQueueDay || null],
      averageQueueTimeHour: [this.product?.averageQueueTimeHour || null],
      averageQueueTimeMinute: [this.product?.averageQueueTimeMinute || null],
      categoryId: [null, [Validators.required]],
      discount: [this.product?.discount || null],
      image: [this.product?.image || ''],
      orderable: [this.product?.orderable || false],
      code: [this.product?.code || '', [Validators.required]],
      description: [this.product?.description || '', [Validators.required]],
      name: [this.product?.name || '', [Validators.required]],
      point: [this.product?.point || null],
      subCategoryId: [this.product?.subCategoryId || null, [Validators.required]],
      tag: [this.product?.tag || '', [Validators.required]],
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
      console.log(this.form.get('code')?.value, this.form.get('name')?.value, this.form.get('subCategoryId')?.value)
       const formData = new FormData();
       formData.append('isActive', this.form.get('isActive')?.value);
       formData.append('averageQueueDay', this.form.get('averageQueueDay')?.value);
       formData.append('averageQueueTimeHour', this.form.get('averageQueueTimeHour')?.value);
       formData.append('averageQueueTimeMinute', this.form.get('averageQueueTimeMinute')?.value);
      //  formData.append('categoryId', this.form.get('categoryId')?.value);
       formData.append('discount', this.form.get('discount')?.value);
       formData.append('image', this.selectedImage as Blob);
      //  formData.append('mainIngredients', this.form.get('mainIngredients')?.value);
       formData.append('orderable', this.form.get('orderable')?.value);
       formData.append('code', this.form.get('code')?.value);
       formData.append('description', this.form.get('description')?.value);
       formData.append('name', this.form.get('name')?.value);
       formData.append('point', this.form.get('point')?.value);
       formData.append('subCategoryId', this.form.get('subCategoryId')?.value);
       formData.append('tag', this.form.get('tag')?.value);
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
