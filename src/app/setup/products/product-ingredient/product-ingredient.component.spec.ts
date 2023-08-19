import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIngredientComponent } from './product-ingredient.component';

describe('ProductIngredientComponent', () => {
  let component: ProductIngredientComponent;
  let fixture: ComponentFixture<ProductIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductIngredientComponent]
    });
    fixture = TestBed.createComponent(ProductIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
