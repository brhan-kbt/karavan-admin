import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchService } from 'src/app/services/branch/branch.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent {

  @Input() isEdit = false;
  @Input() branchData: any = {
    branchName: '',
    branchAddress: '',
    openingHour: '',
    closingHour: '',
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
    public dialogRef: MatDialogRef<BranchFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private branch:BranchService
  ) {
    this.isEdit = data.isEdit;
  
    if (this.isEdit) {
      this.branchData = data.user; // Access the candidate from the passed data
    } else {
      this.branchData = null;
    }
  
    console.log('user:', this.branchData);
  
    this.form = this.formBuilder.group({
      branchName: [this.branchData?.branchName || null, [Validators.required]],
      branchAddress: [this.branchData?.branchAddress || null],
      openingHour: [this.branchData?.openingHour || null],
      closingHour: [this.branchData?.closingHour || null],
    });
  
  }
  
  onSave(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      console.log(this.form.value);
      const data=this.form.value;
      if(this.isEdit){
        this.save.emit({data, id:this.branchData.id});
      }
      else{
        this.save.emit(this.form.value);
      }
      console.log('Form is invalid');
  }

  }
}
