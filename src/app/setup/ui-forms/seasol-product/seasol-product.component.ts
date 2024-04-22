import { Component, EventEmitter, Input, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-seasol-product',
  templateUrl: './seasol-product.component.html',
  styleUrls: ['./seasol-product.component.scss']
})
export class SeasolProductComponent {
  @Input() isEdit = false;
  @Input() product: any = {
    productId: '',
    categoryId: '',
  };

  @Output() savetodatabase = new EventEmitter<any>();
  form: FormGroup;
  products: any;
  categories: any;
  subCategories: any;
  selectedCategoriesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  categoryIdFound:any;
  @Input() serverErrors: any; // Input property to receive server errors from parent component
  @Input() isSaving!:boolean; // Input property to receive server errors from parent component


  selectedImage!: File;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<SeasolProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private prod:ProductService,

    private subcat: SubCategoryService
  ) {

    this.form = this.formBuilder.group({
      productId: null,
      categoryId: null,
    });

    this.getCategories();
    this.getSubCategories();
    this.getProducts();
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


  async getProducts() {
    try {
       let prods = await this.prod.getProducts();
       this.products = prods.data;

    } catch (error) {
      console.error(error);
      this.products = [];
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
        this.isSaving=true;
        this.serverErrors = {};
      console.log(this.form.get('code')?.value, this.form.get('name')?.value, this.form.get('subCategoryId')?.value)
       const formData = this.form.value;
       console.log('====================================');
       console.log(formData);
       console.log('====================================');
        this.save.emit(formData );
       console.log('Form Data: Valid');
        //  this.dialogRef.close();
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
