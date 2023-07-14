import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';
import { BranchService } from 'src/app/services/branch/branch.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() isEdit = false;
  @Input() userData: any = {
    active: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    branchId: '',
    role: '',
    gender: '',
    birthDate: '',
    
  };

  

  @Output() savetodatabase = new EventEmitter<any>();
  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedBranchesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  branches:any;

  selectedImage: File | string | null = null;
  // @Output() save = new EventEmitter<any>();
  @Output() saveAdmin = new EventEmitter<any>();
  @Output() saveBranchAdmin = new EventEmitter<any>();
  @Output() saveFinanceAdmin = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private subcat: SubCategoryService,
    private user:UserService,
    private branch:BranchService
  ) {
    this.isEdit = data.isEdit;
  
    if (this.isEdit) {
      this.userData = data.user; // Access the candidate from the passed data
    } else {
      this.userData = null;
    }
  
    console.log('user:', this.user);
  
    this.form = this.formBuilder.group({
      active: [this.userData?.active || false],
      fullName: [this.userData?.fullName || null, [Validators.required]],
      email: [this.userData?.email || null],
      phoneNumber: [this.userData?.phoneNumber || null],
      password: [this.userData?.password || 3],
      branchId: [this.userData?.branchId || ''],
      role: [this.userData?.role || ''],
      gender: [this.userData?.gender || ''],
      birthDate: [this.userData?.birthDate || ''],
    });
  
    // this.getCategories();
    // this.getSubCategories();
    this.getBranches();
  }
  
  
   async getBranches() {
     try {
       let branches = await this.branch.getAll();
       this.branches = branches.data;

       //  Create a new array with only categoryName and categoryId
        this.selectedBranchesField = this.branches.map((branch: any) => {
          return {
            branchName: branch.branchName,
            id: branch.branchId
          };
        });

       console.log('Branches:', this.branches);
     } catch (error) {
       console.error(error);
     }
   }

  showBranchSelection = false;

handleRole(event: any): void {
  const selectedRole = event.value;
  console.log(selectedRole);
  this.showBranchSelection = selectedRole === 'Branch_Admin';

  console.log(this.showBranchSelection);
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
      console.log(this.form.value);
      if(this.form.value.role==='Branch_Admin'){
        this.saveBranchAdmin.emit(this.form.value);
      }else if(this.form.value.role==='Finance'){
        this.saveFinanceAdmin.emit(this.form.value);
      }
      else{
        this.saveAdmin.emit(this.form.value);
      }
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
