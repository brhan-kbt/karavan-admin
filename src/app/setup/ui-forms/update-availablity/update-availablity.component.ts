import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';
import { BranchService } from 'src/app/services/branch/branch.service';

@Component({
  selector: 'app-update-availablity',
  templateUrl: './update-availablity.component.html',
  styleUrls: ['./update-availablity.component.scss']
})
export class UpdateAvailablityComponent {
  @Input() isEdit = false;
  @Input() availabilityData: any = {
    type: '',
    isAvailable: '',
    maxThreshold: '',
    productId:'',
    branchId:''
  };



  @Output() savetodatabase = new EventEmitter<any>();
  form: FormGroup;
  categories: any;
  subCategories: any;
  selectedBranchesField: any;
  selectedSubCategoriesField: any;
  selectedCat: number = 0;
  branches:any;
  threshold:any;
  @Input() isSaving!:boolean; // Input property to receive server errors from parent component

  selectedImage!: File ;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<UpdateAvailablityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private subcat: SubCategoryService,
    private user:UserService,
    private branch:BranchService
  ) {
    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.availabilityData = data.branchProduct; // Access the candidate from the passed data
    } else {
      this.availabilityData = null;
    }

    console.log('user:', this.user);
    console.log(this.availabilityData)

     this.threshold=this.availabilityData.maxThreshold;

    this.form = this.formBuilder.group({
      type: [this.availabilityData?.type || ''],
      maxThreshold: [this.availabilityData?.maxThreshold , [Validators.required]],
      isAvailable: [this.availabilityData?.isAvailable , [Validators.required]],
      productId: [this.availabilityData?.productId , [Validators.required]],
      branchId: [this.availabilityData?.branchId , [Validators.required]],
    });

  }




  onSave(): void {
    console.log(this.form.value);
    if(this.form.value){
      this.isSaving = true;
      if(!this.isEdit){
         this.save.emit(this.form.value)
        console.log('Save : ', this.form.value)
        }
        else{
         const data = {...this.form.value, id:this.availabilityData.id}
          console.log('Edit : ', data)
           this.save.emit(data);

        }
    }
    else{
      console.log('Invalid')
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
