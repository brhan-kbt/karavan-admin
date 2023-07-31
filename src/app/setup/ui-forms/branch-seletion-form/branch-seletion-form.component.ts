import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';
import { BranchService } from 'src/app/services/branch/branch.service';

@Component({
  selector: 'app-branch-seletion-form',
  templateUrl: './branch-seletion-form.component.html',
  styleUrls: ['./branch-seletion-form.component.scss']
})
export class BranchSeletionFormComponent {
  @Output() saveAdmin = new EventEmitter<any>();
  @Output() saveBranchAdmin = new EventEmitter<any>();
  @Output() saveFinanceAdmin = new EventEmitter<any>();
  @Output() editBranchAdmin = new EventEmitter<any>();
  isEdit:any;
  form!:FormGroup;
  branches:any;
  userData:any;
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
    this.userData=data.user
    console.log('Selected:', this.userData)


    console.log('user:', this.user);

    this.form = this.formBuilder.group({
      branchId: [''],
    });

    this.getBranches();
  }


   async getBranches() {
     try {
       let branches = await this.branch.getAll();
       this.branches = branches.data;

       //  Create a new array with only categoryName and categoryId
        // this.selectedBranchesField = this.branches.map((branch: any) => {
        //   return {
        //     branchName: branch.branchName,
        //     id: branch.branchId
        //   };
        // });

       console.log('Branches:', this.branches);
     } catch (error) {
       console.error(error);
     }
   }






  onSave(): void {
    if (this.form.valid) {
      const data = {
        id:this.userData.id,
        branchId:this.form.value.branchId
      }

      this.editBranchAdmin.emit(data);
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
