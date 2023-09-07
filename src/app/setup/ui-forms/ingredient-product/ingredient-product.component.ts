import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-ingredient-product',
  templateUrl: './ingredient-product.component.html',
  styleUrls: ['./ingredient-product.component.scss']
})
export class IngredientProductComponent {
  separatorKeysCodes: number[] = [ENTER];
  productCtrl = new FormControl(null);
  filteredProducts!: Observable<string[]>;
  products: string[] = [];
  productIds: string[] = [];
  allIngredients: any[] = [];
  selectedProduct:any;

  @ViewChild('productInput') productInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  constructor(
    public dialogRef: MatDialogRef<IngredientProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private ing:IngredientService) {
      console.log('Product: ', data.product)
      this.selectedProduct=data.product;
    this.getIngredients();
    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(null),
      map((product: string | null) =>
        product ? this._filter(product) : this.allIngredients.map(p => p.name)
      )
    );

 // Initialize products array with existing addons/ingredients
 this.products = data.product.productIngredients.map((pi: any) => pi.ingredient.name);

 // Extract and store the IDs of existing addons/ingredients
 this.productIds = data.product.productIngredients.map((pi: any) => pi.ingredient.id);

  }

  ngAfterViewInit(): void {
    // Manually open the autocomplete dropdown when the input is clicked
    this.productInput.nativeElement.addEventListener('click', () => {
      this.autocomplete.openPanel();
    });
  }

  async getIngredients() {
    try {
      let productData = await this.ing.getIngredients();
      console.log(productData)
      this.allIngredients = productData.data;
    } catch (error) {
      console.error(error);
    }
  }
  displaySelectedIds() {
    console.log('Selected Product IDs:', this.productIds);
    const data ={
      productId:this.selectedProduct.id,
      ingredientIds:this.productIds
    }
    console.log(data);

    this.ing.saveIngredients(data).then(res=>{
      console.log(res);
      this.dialogRef.close();
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log("Value",value)
    if (value) {
      const selectedProduct = this.allIngredients.find(p => p.name === value);
      if (selectedProduct) {
        this.products.push(selectedProduct.name);
        this.productIds.push(selectedProduct.id);
      }
    }
    event.chipInput!.clear();

    this.productCtrl.setValue(null);
  }

  remove(product: string): void {
    const index = this.products.indexOf(product);

    if (index >= 0) {
      this.products.splice(index, 1);
      this.productIds.splice(index, 1);
    }
  }

  productNameToIdMap: Map<string, string> = new Map();
  isDuplicate: boolean = false;

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedProductName = event.option.viewValue;
    const selectedProduct = this.allIngredients.find(p => p.name === selectedProductName);

    if (selectedProduct) {
      if (!this.productNameToIdMap.has(selectedProduct.name)) {
        this.products.push(selectedProduct.name);
        this.productIds.push(selectedProduct.id);
        this.productNameToIdMap.set(selectedProduct.name, selectedProduct.id);
        this.isDuplicate = false;

      } else {
        this.isDuplicate = true;

        console.log('Product already exists:', selectedProduct.name);
      }
    }

    // Clear input and control
    this.productInput.nativeElement.value = '';
    this.productCtrl.setValue(null);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients
      .filter(product => product.name.toLowerCase().includes(filterValue))
      .map(product => product.name);
  }
}
