import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubCategoryService } from 'src/app/services/sub-category/sub-category.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserService } from 'src/app/services/user/user.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-promo-form',
  templateUrl: './promo-form.component.html',
  styleUrls: ['./promo-form.component.scss']
})
export class PromoFormComponent implements OnInit{
  @Input() isEdit = false;
  @Input() mediaData: any = {
    title: '',
    description: '',
    type: 1,
    productId:'',
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
  products:any;
  filteredProducts: any[] = [];
  formSearch!:FormGroup;
  searchTerm: string = '';


  selectedImage!: File ;
  // @Output() save = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() saveEdit = new EventEmitter<any>();
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<PromoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private category: CategoryService,
    private subcat: SubCategoryService,
    private user:UserService,
    private branch:BranchService,
    private product:ProductService
  ) {


    this.isEdit = data.isEdit;

    if (this.isEdit) {
      this.mediaData = data.promo; // Access the candidate from the passed data
    } else {
      this.mediaData = null;
    }

    console.log('user:', this.user);

    this.form = this.formBuilder.group({
      title: [this.mediaData?.title || ''],
      description: [this.mediaData?.description || null, [Validators.required]],
      type: [this.mediaData?.type || null, [Validators.required]],
      productId: [this.mediaData?.productId || null],
      searchControl: [''],
    });

    product.getProducts().then(res=>{
      console.log("Products : ",res);
      this.products=res.data;
      this.filteredProducts=[...this.products];
    })

    this.getBranches();
  }

  displayProduct(product: any): string {
    return product ? product.name : '';
  }

  ngOnInit() {
    this.formSearch = this.fb.group({

    });

    this.form.get('searchControl')?.valueChanges.subscribe((value: string) => {
      this.filterProducts(value);
    });
  }

  filterProducts(searchTerm: string): void {
    console.log(searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product: any) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
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


  onSave(): void {
    console.log(this.form.value);
    console.log(this.selectedImage);
    const formData = new FormData();
     if(this.form.value){
       formData.append('title', this.form.get('title')?.value);
       formData.append('type', this.form.get('type')?.value);
       formData.append('description', this.form.get('description')?.value);
       formData.append('productId', this.form.get('productId')?.value);
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
