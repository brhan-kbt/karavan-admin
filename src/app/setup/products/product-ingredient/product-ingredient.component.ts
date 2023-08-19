import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-ingredient',
  templateUrl: './product-ingredient.component.html',
  styleUrls: ['./product-ingredient.component.scss'],
})
export class ProductIngredientComponent {
  separatorKeysCodes: number[] = [ENTER];
  productCtrl = new FormControl(null);
  filteredProducts!: Observable<string[]>;
  products: string[] = [];
  productIds: string[] = [];
  allProducts: any[] = [];

  @ViewChild('productInput') productInput!: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  constructor(private productService: ProductService) {
    this.getProducts();
    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(null),
      map((product: string | null) =>
        product ? this._filter(product) : this.allProducts.map(p => p.name)
      )
    );
  }

  ngAfterViewInit(): void {
    // Manually open the autocomplete dropdown when the input is clicked
    this.productInput.nativeElement.addEventListener('click', () => {
      this.autocomplete.openPanel();
    });
  }

  async getProducts() {
    try {
      let productData = await this.productService.getProducts();
      this.allProducts = productData.data;
    } catch (error) {
      console.error(error);
    }
  }
  displaySelectedIds() {
    console.log('Selected Product IDs:', this.productIds);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const selectedProduct = this.allProducts.find(p => p.name === value);
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

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedProductName = event.option.viewValue;
    const selectedProduct = this.allProducts.find(p => p.name === selectedProductName);
    if (selectedProduct) {
      this.products.push(selectedProduct.name);
      this.productIds.push(selectedProduct.id);
    }
    this.productInput.nativeElement.value = '';
    this.productCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts
      .filter(product => product.name.toLowerCase().includes(filterValue))
      .map(product => product.name);
  }
}
