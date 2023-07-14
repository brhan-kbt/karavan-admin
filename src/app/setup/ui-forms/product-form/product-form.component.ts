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
    active: '',
    averageQueueDay: '',
    averageQueueTime: {
      hour: '',
      minute: '',
    },
    categoryId: '',
    discount: '',
    image: '',
    mainIngredients: '',
    orderable: '',
    productCode: '',
    productDescription: '',
    productName: '',
    productPoint: '',
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
      active: [this.product?.active || false],
      averageQueueDay: [this.product?.averageQueueDay || null],
      averageQueueTime: this.formBuilder.group({
        hour: [this.product?.averageQueueTime?.hour || null],
        minute: [this.product?.averageQueueTime?.minute || null],
      }),
      categoryId: [this.product?.categoryId || null, [Validators.required]],
      discount: [this.product?.discount || null],
      rating: [this.product?.rating || 3],
      image: [this.product?.image || ''],
      mainIngredients: [this.product?.mainIngredients || ''],
      orderable: [this.product?.orderable || false],
      productCode: [this.product?.productCode || '', [Validators.required]],
      productDescription: [this.product?.productDescription || '', [Validators.required]],
      productName: [this.product?.productName || '', [Validators.required]],
      productPoint: [this.product?.productPoint || null],
      subCategoryId: [this.product?.subCategoryId || null, [Validators.required]],
      tag: [this.product?.tag || ''],
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
          categoryName: category.categoryName,
          id: category.categoryId
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
          subCategoryName: subCategory.subCategoryName,
          id: subCategory.subCategoryId
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
      console.log('Categories:', this.subCategories);
    } catch (error) {
      console.error(error);
    }
  }

  onSave(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('active', this.form.get('active')?.value);
      formData.append('averageQueueDay', this.form.get('averageQueueDay')?.value);
      formData.append('averageQueueTime.hour', this.form.get('averageQueueTime.hour')?.value);
      formData.append('averageQueueTime.minute', this.form.get('averageQueueTime.minute')?.value);
      formData.append('categoryId', this.form.get('categoryId')?.value);
      formData.append('discount', this.form.get('discount')?.value);
      formData.append('image', this.selectedImage as Blob);
      formData.append('mainIngredients', this.form.get('mainIngredients')?.value);
      formData.append('orderable', this.form.get('orderable')?.value);
      formData.append('productCode', this.form.get('productCode')?.value);
      formData.append('productDescription', this.form.get('productDescription')?.value);
      formData.append('productName', this.form.get('productName')?.value);
      formData.append('productPoint', this.form.get('productPoint')?.value);
      formData.append('subCategoryId', this.form.get('subCategoryId')?.value);
      formData.append('tag', this.form.get('tag')?.value);
      formData.append('unitPrice', this.form.get('unitPrice')?.value);
      if (this.isEdit) {
        this.save.emit({ formData, id: this.product.productId });
      } else {
        this.save.emit({ formData });
      }
      console.log('Form Data: Valid');



      // this.dialogRef.close();
    } else {
      // Handle invalid form
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
