import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';
import { BranchService } from 'src/app/services/branch/branch.service';

@Component({
  selector: 'app-media-form',
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.scss']
})
export class MediaFormComponent {
  @Input() isEdit = false;
  @Input() mediaData: any = {
    title: '',
    description: '',
    type: 1,
    image: '',
  };



  @Output() savetodatabase = new EventEmitter<any>();
  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedBranchesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  branches:any;

  selectedImage!: File ;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() saveEdit = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<MediaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private subcat: SubCategoryService,
    private user:UserService,
    private branch:BranchService
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.mediaData = data.user; // Access the candidate from the passed data
    } else {
      this.mediaData = null;
    }

    console.log('user:', this.user);

    this.form = this.formBuilder.group({
      title: [this.mediaData?.title || ''],
      description: [this.mediaData?.description || null, [Validators.required]],
      type: [this.mediaData?.type || null, [Validators.required]],
    });

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
    console.log(this.form.value);
    console.log(this.selectedImage);
    const formData = new FormData();
    if(this.form.value){
      formData.append('title', this.form.get('title')?.value);
      formData.append('type', this.form.get('type')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('image', this.selectedImage );
      if(!this.isEdit){
        this.save.emit(formData)
        }
        else{
          console.log('eDit');
          this.save.emit({formData, id:1});

        }
    }
    else{
      console.log('Invalid')
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
